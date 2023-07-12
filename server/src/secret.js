require("dotenv").config();

const serverPort = process.env.SERVER_PORT || 5001;
const mongoDB = process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017";
const defaultUserImage =
  process.env.DEFALUT_USER_IMAGE_PATH || "public/image/users/defalut.jpg";

const jwtActivationKey = process.env.JWT_ACTIVATION_KEY;
const smtpUserName = process.env.SMTP_USERNAME;
const smtpPassword = process.env.SMTP_PASSWORD;
const clientUrl = process.env.CLIENT_SITE_URL;

module.exports = {
  serverPort,
  mongoDB,
  defaultUserImage,
  jwtActivationKey,
  smtpUserName,
  smtpPassword,
  clientUrl,
};
