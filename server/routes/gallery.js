const express = require('express');
const {
  createGalleryPost,
  getAllGalleryPosts,
  getGalleryPost,
  updateGalleryPost,
  deleteGalleryPost
} = require('../controllers/galleryController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.route('/')
  .get(getAllGalleryPosts)
  .post(protect, authorize('admin'), upload.single('image'), createGalleryPost);

router.route('/:id')
  .get(getGalleryPost)
  .put(protect, authorize('admin'), updateGalleryPost)
  .delete(protect, authorize('admin'), deleteGalleryPost);

module.exports = router;