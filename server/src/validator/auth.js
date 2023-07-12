const { body } = require("express-validator");

const validateUserRegister = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ min: 3, max: 31 })
    .withMessage("Name should be 3 to 31 characters long."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email address."),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required.")
    .isLength({ min: 6 })
    .withMessage("password should be at least 6 characters long.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]+$/
    )
    .withMessage(
      "password should one uppercase, one lowercase ,one number and one special charecture."
    ),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("address is required")
    .isLength({ min: 3 })
    .withMessage("address should be at least 3 characters long."),

  body("phone").trim().notEmpty().withMessage("phone number is required."),

  //   body("image")
  //     .custom((value, { req }) => {
  //       if (!req.file || req.file.buffer) {
  //         thorw(new Error("Image is required.from auth"));
  //       }
  //       return true;
  //     })
  //     // .isString()
  //     // .optional()

  //     .withMessage("Image is required.from auth2"),

  body("image")
    .custom((value, { req }) => {
      if (!req.file ) {
        throw new Error("Image is required.");
      }
      return true;
    })
    .withMessage("Image is required."),
];
module.exports = { validateUserRegister };

// .optional().isString()
