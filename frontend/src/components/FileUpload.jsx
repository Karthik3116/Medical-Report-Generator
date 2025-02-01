import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/fileupload.scss";

const FileUpload = ({ username }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [patientDetails, setPatientDetails] = useState({
    patientName: "",
    patientAge: "",
    patientSex: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("patientName", patientDetails.patientName);
    formData.append("patientAge", patientDetails.patientAge);
    formData.append("patientSex", patientDetails.patientSex);
    formData.append("username", username);

    try {
      const response = await axios.post(
        "http://localhost:4000/image/uploadimage",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        localStorage.setItem('currentReport', JSON.stringify({
          patientDetails,
          image: previewUrl,
          generatedText: response.data.flaskResponse.caption
        }));
        
        navigate(`/report/${response.data.reportId}`);
        toast.success("Report generated successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error processing request");
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
      setPatientDetails({ patientName: "", patientAge: "", patientSex: "" });
      setImage(null);
      setPreviewUrl(null);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit");
      return;
    }

    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails(prev => ({
      ...prev,
      [name]: name === "patientName" ? value.toUpperCase() : value
    }));
  };

  const isFormValid = patientDetails.patientName && 
                     patientDetails.patientAge && 
                     patientDetails.patientSex && 
                     image;

  return (
    <div className="fileupload">
      <h4 id="heading">Patient Details</h4>
      <div className="card">
        <form onSubmit={handleSubmit}>
          {/* Form inputs remain the same as original structure */}
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInputpname"
              name="patientName"
              value={patientDetails.patientName}
              placeholder="Name"
              onChange={handleInputChange}
              required
            />
            <label htmlFor="floatingInputpname">Patient's Name</label>
          </div>

          <div className="form-floating">
            <input
              type="number"
              className="form-control"
              id="floatingInputpage"
              name="patientAge"
              value={patientDetails.patientAge}
              placeholder="Age"
              onChange={handleInputChange}
              required
            />
            <label htmlFor="floatingInputpage">Age</label>
          </div>

          <div className="form-floating">
            <select
              className="form-select"
              id="floatingSelectpsex"
              name="patientSex"
              value={patientDetails.patientSex}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <label htmlFor="floatingSelectpsex">Gender</label>
          </div>

          <div className="mb-3">
            <label className="form-label">Select X-ray image</label>
            <input
              className="form-control"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              required
            />
          </div>

          {previewUrl && (
            <div className="image-preview">
              <img src={previewUrl} alt="Preview" />
            </div>
          )}

          <div className="submit-section">
            {loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              isFormValid && (
                <button 
                  type="submit" 
                  className="btn btn-success"
                  disabled={loading}
                >
                  Generate Report
                </button>
              )
            )}
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FileUpload;