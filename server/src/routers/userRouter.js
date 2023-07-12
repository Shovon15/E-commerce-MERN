const express = require("express");
const { getUsers } = require("../controllers/usersController");
const {
  getUserById,
  deleteUserById,
  processRegister,
  activeUserAccount,
} = require("../controllers/userCOntroller");
const upload = require("../middleware/uploadFile");
const { validateUserRegister } = require("../validator/auth");
const runValidation = require("../validator");

const userRouter = express.Router();

userRouter.post(
  "/process-register",
  upload.single("image"),
  validateUserRegister,
  runValidation,
  processRegister
);
userRouter.post("/verify", activeUserAccount);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUserById);

module.exports = userRouter;
