const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: [true, "Patient Name is required"],
  },
  imageName: {
    type: String,
    required: [true, "Your password is required"],
  },
  imageNamehighlight:{
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model("images", imageSchema);