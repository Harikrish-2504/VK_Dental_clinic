const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: [false, "Image filename is required"],
    },
    path: {
      type: String,
      required: [false, "Image path is required"],
    },
    mimetype: {
      type: String,
      required: [false, "Image mimetype is required"],
    },
    size: {
      type: Number,
      required: [true, "Image size is required"],
    },
  },
  { _id: false }
);

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [120, "Name cannot exceed 120 characters"],
    },
    place: {
      type: String,
      required: [true, "Place is required"],
      trim: true,
      maxlength: [120, "Place cannot exceed 120 characters"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
      trim: true,
      maxlength: [1000, "Comment cannot exceed 1000 characters"],
    },
    image: {
      type: fileSchema,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

testimonialSchema.index({ isActive: 1, createdAt: -1 });

testimonialSchema.methods.toResponseJSON = function toResponseJSON(
  host,
  protocol
) {
  const testimonial = this.toObject();
  let imageUrl = null;

  // only generate URL if a real filename exists
  if (testimonial.image && testimonial.image.filename) {
    imageUrl = `${protocol}://${host}/backend/api/uploads/${testimonial.image.filename}`;
  }
  return {
    ...testimonial,
    image: {
      ...testimonial.image,
      url: imageUrl,
    },
  };
};

module.exports = mongoose.model("Testimonial", testimonialSchema);
