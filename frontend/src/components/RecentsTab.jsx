import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecentsTab = ({ username }) => {
  const [recentReports, setRecentReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentReports = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/reports?username=${encodeURIComponent(username)}`
        );
        setRecentReports(response.data.reports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    if (username) fetchRecentReports();
  }, [username]);

  return (
    <div className="recents-tab">
      <h5>Recent Reports</h5>
      <ul className="reports-list">
        {recentReports.map(report => (
          <li 
            key={report._id}
            onClick={() => navigate(`/report/${report._id}`)}
          >
            <div className="report-item">
              <span>{report.patientName}</span>
              <span>{new Date(report.date).toLocaleDateString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentsTab;