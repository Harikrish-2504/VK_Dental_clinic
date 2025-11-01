// models/Contact.js
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    email: { type: String, required: true, trim: true, lowercase: true },
    number: { type: String, required: true, trim: true },
    details: { type: String, required: true, trim: true, maxlength: 2000 },
    ip: { type: String }, // store submitter ip (optional)
    userAgent: { type: String },
    sent: { type: Boolean, default: false }, // whether email sending succeeded
    error: { type: String }, // store last error message (if any)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
