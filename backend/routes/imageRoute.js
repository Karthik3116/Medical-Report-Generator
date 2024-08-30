


const FormData = require("form-data");
const axios = require("axios");
const fs = require("fs");
const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const imageModel = require("../models/ImageModel");

// Configure Cloudinary
cloudinary.config({
  cloud_name: "doth0iam3",
  api_key: "729281242664365",
  api_secret: "0E-gQGh5BYn86D-4zDbS05IopSc",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads")); // Specify the destination directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = `${uniqueSuffix}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.post("/uploadimage", upload.single("image"), async (req, res) => {
  try {
    console.log("Image POST request received");
    console.log(req.body);

    const imagePath = path.join("./public/uploads", req.file.filename);

    // Upload the image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(imagePath, {
      folder: "Medicalimages", // Optional: specify a folder in Cloudinary
    });

    // Send image data to Flask API
    const imageFile = fs.createReadStream(imagePath);
    const formData = new FormData();
    formData.append("file", imageFile);

    const flaskResponse = await axios.post("http://localhost:5000/predictllm", formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    // Return the response with the Cloudinary URL and Flask response
    res.status(201).json({
      cloudinaryUrl: cloudinaryResponse.secure_url,
      flaskResponse: flaskResponse.data,
    });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Error processing image" });
  }
});

module.exports = router;
