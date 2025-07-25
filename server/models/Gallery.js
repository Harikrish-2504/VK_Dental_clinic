const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  // title: {
  //   type: String,
  //   required: [true, 'Please provide a title'],
  //   trim: true,
  //   maxlength: [100, 'Title cannot exceed 100 characters']
  // },
  // description: {
  //   type: String,
  //   trim: true,
  //   maxlength: [500, 'Description cannot exceed 500 characters']
  // },
  image: {
    filename: {
      type: String,
      required: [true, 'Image filename is required']
    },
    path: {
      type: String,
      required: [true, 'Image path is required']
    },
    mimetype: {
      type: String,
      required: [true, 'Image mimetype is required']
    },
    size: {
      type: Number,
      required: [true, 'Image size is required']
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Add index for better query performance
gallerySchema.index({ isActive: 1, createdAt: -1 });

module.exports = mongoose.model('Gallery', gallerySchema);