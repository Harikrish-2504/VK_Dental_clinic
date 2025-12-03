const Gallery = require("../models/Gallery");
const path = require("path");
const fs = require("fs");

// @desc    Create new gallery post
// @route   POST /api/gallery
// @access  Private/Admin
exports.createGalleryPost = async (req, res) => {
  try {
    // const { title, description } = req.body;
    console.log("Creating gallery post with file:", req.user.id);
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    const galleryPost = await Gallery.create({
      // title,
      // description,
      image: {
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Gallery post created successfully",
      data: galleryPost,
    });
  } catch (error) {
    // Delete uploaded file if database save fails
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }

    res.status(500).json({
      success: false,
      message: "Error creating gallery post",
      error: error.message,
    });
  }
};

// @desc    Get all gallery posts
// @route   GET /api/gallery
// @access  Public
exports.getAllGalleryPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const query = { isActive: true };

    const total = await Gallery.countDocuments(query);
    const galleryPosts = await Gallery.find(query)
      .populate("createdBy", "name")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);

    // Add full image URL to each post
    const postsWithImageUrls = galleryPosts.map((post) => ({
      ...post.toObject(),
      image: {
        ...post.image,
        url: `${req.protocol}://${req.get("host")}/backend/uploads/${
          post.image.filename
        }`,
      },
    }));

    const pagination = {};
    if (startIndex + limit < total) {
      pagination.next = { page: page + 1, limit };
    }
    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }

    res.status(200).json({
      success: true,
      count: galleryPosts.length,
      total,
      pagination,
      data: postsWithImageUrls,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving gallery posts",
    });
  }
};

// @desc    Get single gallery post
// @route   GET /api/gallery/:id
// @access  Public
exports.getGalleryPost = async (req, res) => {
  try {
    const galleryPost = await Gallery.findById(req.params.id).populate(
      "createdBy",
      "name"
    );

    if (!galleryPost || !galleryPost.isActive) {
      return res.status(404).json({
        success: false,
        message: "Gallery post not found",
      });
    }

    // Add full image URL
    const postWithImageUrl = {
      ...galleryPost.toObject(),
      image: {
        ...galleryPost.image,
        url: `${req.protocol}://${req.get("host")}/uploads/${
          galleryPost.image.filename
        }`,
      },
    };

    res.status(200).json({
      success: true,
      data: postWithImageUrl,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving gallery post",
    });
  }
};

// @desc    Update gallery post
// @route   PUT /api/gallery/:id
// @access  Private/Admin
exports.updateGalleryPost = async (req, res) => {
  try {
    const { title, description } = req.body;

    const galleryPost = await Gallery.findById(req.params.id);

    if (!galleryPost) {
      return res.status(404).json({
        success: false,
        message: "Gallery post not found",
      });
    }

    galleryPost.title = title || galleryPost.title;
    galleryPost.description = description || galleryPost.description;

    await galleryPost.save();

    res.status(200).json({
      success: true,
      message: "Gallery post updated successfully",
      data: galleryPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating gallery post",
    });
  }
};

// @desc    Delete gallery post
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
exports.deleteGalleryPost = async (req, res) => {
  try {
    const galleryPost = await Gallery.findById(req.params.id);

    if (!galleryPost) {
      return res.status(404).json({
        success: false,
        message: "Gallery post not found",
      });
    }

    // Delete image file
    const imagePath = path.join(__dirname, "..", galleryPost.image.path);
    fs.unlink(imagePath, (err) => {
      if (err) console.error("Error deleting image file:", err);
    });

    await Gallery.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Gallery post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting gallery post",
    });
  }
};
