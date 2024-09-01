const FormData = require("form-data");
const axios = require("axios");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const router = require("express").Router();
const multer = require("multer");
const imageModel = require("../models/ImageModel");
const path = require("path");

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
    console.log("image post request recived");
    console.log(req.body);

    const { username, patientSex, patientAge, patientName } = req.body;

    const imagePath = path.join("./public/uploads", req.file.filename);
    //cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(imagePath, {
      folder: "Medicalimages",
    });
    const cloudinaryurl = cloudinaryResponse.secure_url;

    const imageFile = fs.createReadStream(imagePath);
    const formData = new FormData();
    formData.append("file", imageFile);

    // Send image data to Flask API
    const flaskResponse = await axios.post(
      "http://localhost:5000/predictllm",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );

    try {
      const newImage = new imageModel({
        username,
        patientSex,
        patientAge,
        patientName,
        flaskResponse: flaskResponse.data,
        cloudinaryurl,
      });

      // Save the new image document to the database
      await newImage.save();
    } catch (dbError) {
      console.error("Error saving to database:", dbError);
      res.status(500).json({ error: "Error saving to database" });
    }

    res.status(201).json({
      flaskResponse: flaskResponse.data,
      cloudinaryUrl: cloudinaryurl,
    });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Error processing image" });
  }
});

router.get("/getrecent", async (req, res) => {
  try {
    const { username } = req.query;
    console.log("username is ", username);
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    // Retrieve the last 5 recent documents for the specified username
    const recentImages = await imageModel
      .find({ username })
      .sort({ createdAt: -1 }) // Sort by `createdAt` in descending order
      .limit(5);
    res.status(200).json({ recentImages });
  } catch (error) {
    console.error("Error retrieving recent images:", error);
    res.status(500).json({ error: "Error retrieving recent images" });
  }
});

router.get("/getall", async (req, res) => {
  try {
    const { username } = req.query;
    console.log("username is ", username);
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    // Retrieve the last 5 recent documents for the specified username
    const allImages = await imageModel
      .find({ username });
    res.status(200).json({ allImages });
  } catch (error) {
    console.error("Error retrieving all images:", error);
    res.status(500).json({ error: "Error retrieving all images" });
  }
});

module.exports = router;
