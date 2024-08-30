import React from "react";
import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";
import "../styles/report.scss"; // Import the SCSS file

const Report = () => {
  const location = useLocation();
  const { patientDetails, image , generatedText } = location.state || {};

  async function handleOnClick() {
    const element = document.getElementById("report");
    html2pdf(element, {
      margin: 0,
    });
  }

  return (
    <div id="report" className="report-container">
      <h2>Patient Report</h2>
      {patientDetails ? (
        <div className="patient-details">
          <p id="details">
            Name :{" "}
            <span>
              <p>{patientDetails.patientName}</p>
            </span>
          </p>
          <p id="details">
            Age :{" "}
            <span>
              <p>{patientDetails.patientAge}</p>
            </span>
          </p>
          <p id="details">
            Sex :{" "}
            <span>
              <p>{patientDetails.patientSex}</p>
            </span>{" "}
          </p>
        </div>
      ) : (
        <p>No patient details available.</p>
      )}
      {image && (
        <div className="image-container">
          <h6>X-Ray</h6>
          <img src={URL.createObjectURL(image)} alt="Patient" />
        </div>
      )}
      <div className="generated-text">
        <h4>Generated caption by InsightXray</h4>
        <p>{generatedText}</p>
      </div>
      
      <div className="actions" data-html2canvas-ignore>
        <button class="styled-button" onClick={handleOnClick}>
          Download
        </button>
      </div>
    </div>
  );
};

export default Report;
