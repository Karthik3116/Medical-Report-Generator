import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const RecentsTab = ({username}) => {
  const [recentImages, setRecentImages] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate
console.log(username);
  useEffect(() => {
    // Fetch recent images from the server
    const fetchRecentImages = async () => {
      try {
        const encodedUsername = encodeURIComponent(username);
        const response = await axios.get(`http://localhost:4000/image/getrecent?username=${encodedUsername}`);
        setRecentImages(response.data.recentImages);
      } catch (error) {
        console.error("Error fetching recent images:", error);
      }
    };

    fetchRecentImages();
  }, [username]);

  const handlePatientClick = (patient) => {
    // Navigate to /report with state
    navigate('/reportrecent', { state: { patient } });
  };

  return (
    <div>
      <h5>Recent Patients</h5>
      <ul>
        {recentImages.map((image) => (
          <li key={image._id} onClick={() => handlePatientClick(image)}>
            {image.patientName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentsTab;