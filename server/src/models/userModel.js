const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const { defaultUserImage } = require("../secret");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "user name is required"],
      trim: true,
      minLength: [3, "user name should be minimum 3 charectures"],
      maxLength: [31, "user name should be maximum 31 charectures"],
    },

    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
    },

    password: {
      type: String,
      required: [true, "user password is required"],
      trim: true,
      minLength: [6, "user password should be minimum 6 charectures"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },

    image: {
      type: Buffer,
      contentType: String,
      required: [true, "Image is required from userModel"],
    },

    address: {
      type: String,
      required: [true, "address is required"],
    },

    phone: {
      type: String,
      required: [true, "phone number is required"],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("user", userSchema);

module.exports = User;
