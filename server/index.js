const express = require("express");
const app = express();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const multer = require("multer"); //module allowing to parse formData
const upload = multer({ dest: "data/" });

app.listen(8080, () => {
  console.log("server has started on port 8080");
});
