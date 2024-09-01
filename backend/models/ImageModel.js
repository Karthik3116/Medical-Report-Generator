const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    patientSex: {
      type: String,
      required: true,
    },
    patientAge: {
      type: Number,
      required: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    flaskResponse: {
      type: mongoose.Schema.Types.Mixed, // To handle different types of data from Flask response
      required: true,
    },
    cloudinaryurl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const ImageModel = mongoose.model("Image", imageSchema);

module.exports = ImageModel;
