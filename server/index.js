const express = require("express");
const app = express();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const path = require("path");
const multer = require("multer"); //module allowing to parse formData
app.use(cors()); // allow cross origin resource sharing
app.use(express.static("./public")); //set up static folder

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("myImage");

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

app.post("/files", upload, (req, res, next) => {
  // the 'upload' handler thats passed as second parameter handles naming and storing the file -a.o
  console.log(req.file);
});

app.listen(8080, () => {
  console.log("server has started on port 8080");
});
