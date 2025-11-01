const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const contactController = require("../controllers/contactController");

// Rate limiter to prevent spam
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: {
    success: false,
    message: "Too many submissions. Try again later.",
  },
});

// Validation
const contactValidation = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage("Name is required."),
  body("email").isEmail().withMessage("Valid email required."),
  body("number")
    .trim()
    .isLength({ min: 6, max: 30 })
    .withMessage("Valid phone required."),
  body("details")
    .trim()
    .isLength({ min: 5, max: 2000 })
    .withMessage("Details required."),
];

router.post("/", contactLimiter, contactValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }
  return contactController.submitContact(req, res, next);
});

module.exports = router;
