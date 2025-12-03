const fs = require("fs");
const path = require("path");
const Testimonial = require("../models/Testimonial");

// @desc    Create testimonial entry
// @route   POST /api/testimonials
// @access  Private/Admin
exports.createTestimonial = async (req, res) => {
  try {
    const { name, place, comment } = req.body;

    if (!name || !place || !comment) {
      return res.status(400).json({
        success: false,
        message: "Name, place, and comment are required",
      });
    }
    let imageData = {
      filename: null,
      path: "",
      mimetype: "",
      size: "0",
    };
    if (req.file) {
      imageData = {
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      };
    }

    const testimonial = await Testimonial.create({
      name: name.trim(),
      place: place.trim(),
      comment: comment.trim(),
      image: imageData,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      data: testimonial.toResponseJSON(req.get("host"), req.protocol),
    });
  } catch (error) {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file after failure:", err);
      });
    }

    res.status(500).json({
      success: false,
      message: "Error creating testimonial",
      error: error.message,
    });
  }
};

// @desc    Get testimonials
// @route   GET /api/testimonials
// @access  Public
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true })
      .sort({ createdAt: -1 })
      .populate("createdBy", "name");

    const data = testimonials.map((testimonial) =>
      testimonial.toResponseJSON(req.get("host"), req.protocol)
    );

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving testimonials",
      error: error.message,
    });
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    const imagePath = path.join(__dirname, "..", testimonial.image.path);
    fs.unlink(imagePath, (err) => {
      if (err) console.error("Error deleting testimonial image:", err);
    });

    await testimonial.deleteOne();

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting testimonial",
      error: error.message,
    });
  }
};
exports.updateTestimonial = async (req, res) => {
  try {
    const { name, place, comment } = req.body;
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    // Update fields
    testimonial.name = name || testimonial.name;
    testimonial.place = place || testimonial.place;
    testimonial.comment = comment || testimonial.comment;

    // Handle image update only if uploaded
    if (req.file) {
      // delete old image
      if (testimonial.image?.path) {
        fs.unlink(testimonial.image.path, () => {});
      }

      testimonial.image = {
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      };
    }

    await testimonial.save();

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: testimonial.toResponseJSON(req.get("host"), req.protocol),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating", error });
  }
};
