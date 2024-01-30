const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|webp/;
  const mimeType = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname));

  if (mimeType && extname) {
    cb(null, true);
  } else {
    cb("Give proper files format to upload", false);
  }
};

const singleUpload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5 MB limit
  fileFilter: fileFilter,
}).single("image");

const multipleUpload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5 MB limit
  fileFilter: fileFilter,
}).fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
]);

module.exports = { singleUpload, multipleUpload };
