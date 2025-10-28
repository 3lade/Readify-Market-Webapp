const { body, validationResult } = require('express-validator');

const validateUserRegistration = [
  body('username')
    .notEmpty()
    .withMessage('Username is required'),
  body('email')
    .isEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('mobileNumber')
    .notEmpty()
    .withMessage('Mobile number is required'),
  body('userRole')
    .notEmpty()
    .withMessage('User Role is required'),

  // Final middleware to handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const extractedErrors = errors.array().map(err => `${err.path}: ${err.msg}`);
      return res.status(400).json({
        message: `User validation failed: ${extractedErrors.join(', ')}`
      });
    }
    next();
  }
];

module.exports = { validateUserRegistration };