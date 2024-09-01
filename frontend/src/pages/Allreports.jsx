import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import "../styles/allreports.scss";
const Allreports = () => {

  const location = useLocation();
  const {username} = location.state || {};


  const [allImages, setallImages] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate
console.log(username);
  useEffect(() => {
    // Fetch recent images from the server
    const fetchallImages = async () => {
      try {
        const encodedUsername = encodeURIComponent(username);
        const response = await axios.get(`http://localhost:4000/image/getall?username=${encodedUsername}`);
        setallImages(response.data.allImages);
      } catch (error) {
        console.error("Error fetching recent images:", error);
      }
    };

    fetchallImages();
  }, [username]);

  const handlePatientClick = (patient) => {
    // Navigate to /report with state
    navigate('/reportrecent', { state: { patient } });
  };

  return (
    <div className="allreportspage">
      <h5 id="title">All Patients</h5>
      <table className="patients-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Sex</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allImages.map((image) => (
            <tr key={image._id} onClick={() => handlePatientClick(image)}>
              <td>{image.patientName}</td>
              <td>{image.patientSex}</td>
              <td>{image.patientAge}</td>
              <td>
                <button className="view-button">View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Allreports;