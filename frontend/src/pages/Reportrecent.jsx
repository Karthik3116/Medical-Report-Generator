import React from "react";
import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";
import "../styles/report.scss"; // Import the SCSS file
import Header from "../components/Header";
import { useCookies } from "react-cookie";

const Reportrecent = () => {
    const location = useLocation();
    const { patient } = location.state || {};
    console.log(patient);
  const [cookies, removeCookie] = useCookies([]);
  const imageurl = patient.cloudinaryurl;

  async function handleOnClick() {
    const element = document.getElementById("report");
    html2pdf(element, {
      margin: 0,
    });
  }
  const handleLogout = () => {
    removeCookie("token");
    navigate("/signup");
  };

  return (
    
    <>
      <Header logout={handleLogout} />
      <div id="report" className="report-container">
        <h2>Report</h2>
        {patient ? (
          <div className="patient-details">
            <p id="details">
              Name :{" "}
              <span>
                <p>{patient.patientName}</p>
              </span>
            </p>
            <p id="details">
              Age :{" "}
              <span>
                <p>{patient.patientAge}</p>
              </span>
            </p>
            <p id="details">
              Sex :{" "}
              <span>
                <p>{patient.patientSex}</p>
              </span>{" "}
            </p>
          </div>
        ) : (
          <p>No patient details available.</p>
        )}
        {imageurl && (
          <div className="image-container">
            <h6>X-Ray</h6>
            <img src={imageurl} alt="Patient x-ray image" />
          </div>
        )}
        <div className="generated-text">
          <h4>Generated caption by InsightXray</h4>
          <p>{patient.flaskResponse.caption}</p>
          <h6>{patient.flaskResponse.prediction}</h6>
        </div>

        <div className="actions" data-html2canvas-ignore>
          <button class="styled-button" onClick={handleOnClick}>
            Download
          </button>
        </div>
      </div>
    </>
  );
};

export default Reportrecent;
