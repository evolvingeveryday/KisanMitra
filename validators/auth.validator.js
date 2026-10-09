const { body } = require("express-validator");

const registerValidator = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2, max: 80 }).withMessage("Name must be 2-80 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("phone")
    .trim()
    .notEmpty().withMessage("Phone is required")
    .matches(/^[6-9]\d{9}$/).withMessage("Please provide a valid Indian mobile number"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

  body("role")
    .notEmpty().withMessage("Role is required")
    .isIn(["farmer", "consumer"]).withMessage("Role must be either 'farmer' or 'consumer'"),

  body("farmDetails")
    .if(body("role").equals("farmer"))
    .notEmpty().withMessage("farmDetails is required for farmers"),

  body("farmDetails.landSize")
    .optional()
    .isFloat({ min: 0 }).withMessage("landSize must be a positive number"),
];

const loginValidator = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required"),
];

const updateMeValidator = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 80 }).withMessage("Name must be 2-80 characters"),

  body("phone")
    .optional()
    .trim()
    .matches(/^[6-9]\d{9}$/).withMessage("Please provide a valid Indian mobile number"),

  body("farmDetails.landSize")
    .optional()
    .isFloat({ min: 0 }).withMessage("landSize must be a positive number"),
];

module.exports = 
{
  registerValidator,
  loginValidator,
  updateMeValidator,
};