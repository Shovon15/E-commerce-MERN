const multer = require("multer");
const { MAX_UPLOAD_FILE, ALLOWED_FILE_TYPE } = require("../config/config");

const MAX_FILE_SIZE = Number(MAX_UPLOAD_FILE) || 2097152;
// const allowedFileType = ALLOWED_FILE_TYPE || [
//   "image/jpg",
//   "image/jpeg",
//   "image/png",
// ];
// const UPLOAD_DIR = UPLOAD_USER_IMG_DIR || "public/image/users";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed"), false);
  }
  if (file.size > MAX_FILE_SIZE) {
    return cb(new Error("File size is too large."), false);
  }
  if (!ALLOWED_FILE_TYPE.includes(file.mimetype)) {
    return cb(new Error("File type is not allowed."), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
