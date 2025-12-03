const express = require("express");
const {
  createTestimonial,
  getTestimonials,
  deleteTestimonial,
  updateTestimonial,
} = require("../controllers/testimonialController");
const { protect, authorize } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

router
  .route("/")
  .get(getTestimonials)
  .post(
    protect,
    authorize("superadmin", "admin"),
    upload.single("image"),
    createTestimonial
  );

router
  .route("/:id")
  .delete(protect, authorize("superadmin", "admin"), deleteTestimonial);

router.put(
  "/:id",
  protect,
  authorize("superadmin", "admin"),
  upload.single("image"),
  updateTestimonial
);

module.exports = router;
