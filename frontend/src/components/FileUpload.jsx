import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/fileupload.scss"


const FileUpload = () => {
  const navigate = useNavigate(); 

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); 
  const [patientDetails, setpatientDetails] = useState({
    patientName: "",
    patientAge: "",
    patientSex: "",
  });
  // const [imageurl, setimageurl] = useState("");
  const { patientName, patientAge, patientSex } = patientDetails;
  const [loading, setLoading] = useState(false);


  const setgeneratedText = (caption) => {
    navigate("/report", { state: { patientDetails, image, generatedText: caption } });
  };
  
  const submitImage = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("patientName", patientName);
    formData.append("patientAge", patientAge);
    formData.append("patientSex", patientSex);

    console.log(formData);
    // navigate("/report", { state: { patientDetails, image } })
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
      const caption = response.data.flaskResponse.caption;
      console.log("Response from server:", caption);

      setgeneratedText(caption);


     

      
    } catch (error) {
      toast.error("Error uploading data");
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
      setpatientDetails({
        patientName: "",
        patientAge: "",
        patientSex: "",
      });
      setImage(null);
    }
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result); // Set the preview URL
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null); // Reset if no file is selected
    }
  };

  const updatePatientDetails = (e) => {
    const { name, value } = e.target;
    setpatientDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    console.log(e);
    console.log(e.target.value);
  };

  const isFormComplete = patientName && patientAge && patientSex && image;
  return (
    <div>
      <div className="fileupload">
  
          <h4 id="heading">Patient Details</h4>
      
        <div className="card">
          <form onSubmit={submitImage}>
            <div className="form-floating">
              <input
                maxLength="50"
                type="text"
                class="form-control"
                id="floatingInputpname"
                name="patientName"
                value={patientName.toUpperCase()}
                placeholder="name"
                onChange={updatePatientDetails}
                required
              />
              <label htmlFor="floatingInputpname">Patient's Name</label>
            </div>

            <div className="form-floating">
              <input
                maxLength="3"
                type="number"
                class="form-control"
                id="floatingInputpage"
                name="patientAge"
                value={patientAge}
                placeholder="Age"
                onChange={updatePatientDetails}
                required
              />
              <label htmlFor="floatingInputpage">Age</label>
            </div>

            <div className="form-floating">
              <select
                className="form-select"
                id="floatingSelectpsex"
                name="patientSex"
                aria-label="Floating label select example"
                value={patientSex}
                onChange={updatePatientDetails}
                required
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <label htmlFor="floatingSelectpsex"></label>
            </div>
            <div class="mb-3">
              <label for="formFile" class="form-label">
                Select X-ray image
              </label>
              <input
                class="form-control"
                type="file"
                id="formFile"
                accept="image/*"
                onChange={uploadImage}
              />
            </div>

            {previewUrl && (
              <div className="image-preview">
                <img src={previewUrl} alt="Selected" style={{ maxWidth: 'auto', height: 'auto', marginTop: '10px' }} />
              </div>
            )}
      
            <div>
              {loading ? (
                <p>loading...</p>
              ) : (
                isFormComplete && (
                  <div>
                    <button type="submit" className="btn btn-success">
                      submit
                    </button>
                  </div>
                )
              )}
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FileUpload;
