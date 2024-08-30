import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "../styles/fileupload.scss";
import "../styles/scanmri.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Report from "./Report";

import { useNavigate } from "react-router-dom";
// import Interpretation from "../components/Interpret";

const ScanMri = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [patientName, setpatientName] = useState("");
  const [gotresponse, setGotResponse] = useState(null);
  const [page, setAge] = useState(0);

  const [loading, setLoading] = useState(false);
  const submitImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("patientName", patientName);
    formData.append("category", "MRI");
    console.log(formData);
    setpatientName("");
    // setAge(0);
    setImage(null);
    try {
      const response = await axios.post(
        "http://localhost:4000/image/uploadimage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Data uploaded successfully");
      setGotResponse(response.data);
      console.log("Response from server:", response.data);
      // navigate("/result")
    } catch (error) {
      toast.error("Error uploading data");
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    const imageUrl = URL.createObjectURL(selectedImage);
    setImageUrl(imageUrl);
  };
  const updatePatientName = (e) => {
    const input = e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase(); // Allow only letters and numbers
    setpatientName(input);
    console.log(e);
    console.log(e.target.value);
  };
  const updateAge = (e) => {
    const input = e.target.value.replace(/[^0-9]/g, "").toUpperCase(); // Allow only letters and numbers
    setAge(input);
    console.log(e);
    console.log(e.target.value);
  };

  return (
    <div>
      <div className="fileupload">
        <div className="card">
          <form onSubmit={submitImage}>
            <div class="form-floating">
              <select
                class="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
              >
                <option value="MRI">MRI</option>
                {/* <option value="X-RAY">X-RAY</option> */}
              </select>
              <label for="floatingSelect">Medical Imaging Type</label>
            </div>
            <div className="form-floating">
              <input
                maxLength="12"
                type="text"
                class="form-control"
                id="floatingInputregisno"
                value={patientName}
                onChange={updatePatientName}
              />
              <label htmlFor="floatingInputregisno">Patient Name</label>
            </div>
            <div className="form-floating">
              <input
                maxLength="2"
                type="tel"
                class="form-control"
                id="floatingPasswordphoneno"
                placeholder="age"
                value={page}
                onChange={updateAge}
              />
              <label htmlFor="floatingPasswordphoneno">Age</label>
            </div>
            <div>
              <div>
                <label htmlFor="input-file" className="upload">
                  Upload image
                </label>
              </div>
              <div className="image-preview">
            {imageUrl && <img src={imageUrl} alt="Preview" />}
          </div>

              <div className="selected-file-box">
                {image && <span>{image.name}</span>}
              </div>
              <input
                type="file"
                id="input-file"
                accept="image/*"
                onChange={uploadImage}
              />
            </div>
            <div>
              {loading ? (
                <p>loading...</p>
              ) : (
                image &&
                patientName && (
                  <div>
                    <button type="submit" className="btn btn-success">
                      submit
                    </button>
                  </div>
                )
              )}
            </div>
          </form>
          {}
        </div>
        <div className="response-section">
        {gotresponse && (
          <>
            <h2>
              Prediction class:{" "}
              <span className="prediction-class">
                {gotresponse.flaskResponse.prediction_class}
              </span>
            </h2>
            <h2>
              Confidence:{" "}
              <span className="confidence">
                {gotresponse.flaskResponse.max_pred}
              </span>
            </h2>
            <Interpretation age={page} patientClass={gotresponse.flaskResponse.prediction_class} />
          </>
        )}
      </div>
      </div>
      <ToastContainer  />
     
    </div>
  );
};

export default ScanMri;
