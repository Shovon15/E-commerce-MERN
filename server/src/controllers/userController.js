const { successResponse } = require("./responseController");
const findeWithId = require("../serveice/findItem");
const User = require("../models/userModel");
const { deleteImage } = require("../helper/deleteImage");
const createError = require("http-errors");
const { createJsonWebToken } = require("../helper/jsonwebtoken");
const { jwtActivationKey, clientUrl } = require("../secret");
const sendEmailWithNodeMailer = require("../helper/email");
const jwt = require("jsonwebtoken");

// ------------get user by id--------------------
const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };

    const user = await findeWithId(User, id, options);

    return successResponse(res, {
      statusCode: 200,
      message: "User was return successfully!!!",
      payload: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ------------------delete user by id------------------------
const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };

    const user = await findeWithId(User, id, options);

    const userImagePath = user.image;

    deleteImage(userImagePath);

    // fs.access(userImagePath, (err) => {
    //   if (err) {
    //     console.log("user image does not exist");
    //   } else {
    //     fs.unlink(userImagePath, (err) => {
    //       if (err) throw err;
    //       console.log("user image was deleted");
    //     });
    //   }
    // });

    await User.findByIdAndDelete({
      _id: id,
      isAdmin: false,
    });

    return successResponse(res, {
      statusCode: 200,
      message: "User was deleted successfully!!!",
    });
  } catch (error) {
    next(error);
  }
};

// ------------------processRegister------------------------
const processRegister = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const imageBufferString = req.file.buffer.toString("base64");
    const userExists = await User.exists({ email: email });

    if (userExists) {
      throw createError(409, "user email already exist!!!");
    }

    const webToken = createJsonWebToken(
      { name, email, phone, address, password, image: imageBufferString },
      jwtActivationKey,
      "10m"
    );

    const emailData = {
      email: "shovon1500@gmail.com",
      subject: "account activation Email",
      html: `<h2>Hello ${name}</h2>
      <p>Please click here <a href="${clientUrl}api/users/activate/${webToken}" target="_blank">activate</a> your account!!!</p>
      `,
    };
    try {
      // await sendEmailWithNodeMailer(emailData);
    } catch (error) {
      next(createError(500, "Failed to send varification email"));
      return;
    }

    return successResponse(res, {
      statusCode: 200,
      message: `please go to your ${email} for registration process!!!`,
      payload: {
        webToken,
        imageBufferString,
      },
    });
  } catch (error) {
    next(error);
  }
};

const activeUserAccount = async (req, res, next) => {
  try {
    const token = req.body.token;
    if (!token) throw createError(404, "token not found");

    try {
      const decoded = jwt.verify(token, jwtActivationKey);
      if (!decoded) throw createError(401, "wrong user token!!!");

      const userExists = await User.exists({ email: decoded.email });

      if (userExists) {
        throw createError(409, "user email already exist!!!");
      }

      await User.create(decoded);

      return successResponse(res, {
        statusCode: 201,
        message: `user registered successfully`,
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw createError(401, "token has expired");
      } else if (error.name === "JsonWebTokenError") {
        throw createError(401, "invalid token");
      } else {
        throw error;
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserById,
  deleteUserById,
  processRegister,
  activeUserAccount,
};
