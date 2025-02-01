import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Report = () => {
  const { reportId } = useParams();
  const location = useLocation();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        let data = location.state?.reportData;
        
        if (!data) {
          const savedData = localStorage.getItem('currentReport');
          if (savedData) {
            data = JSON.parse(savedData);
          } else if (reportId) {
            const response = await axios.get(`http://localhost:4000/reports/${reportId}`);
            data = response.data;
          }
        }

        if (data) {
          setReportData(data);
          localStorage.removeItem('currentReport');
        } else {
          throw new Error('Report data not found');
        }
      } catch (error) {
        toast.error('Failed to load report');
        console.error('Report error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId, location.state]);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="report-container">
      {reportData ? (
        <>
          <h2>Patient Report</h2>
          <div className="patient-info">
            <p>Name: {reportData.patientDetails.patientName}</p>
            <p>Age: {reportData.patientDetails.patientAge}</p>
            <p>Gender: {reportData.patientDetails.patientSex}</p>
          </div>
          <div className="image-section">
            <img src={reportData.image} alt="Medical Scan" />
          </div>
          <div className="diagnosis-section">
            <h3>Diagnosis Summary</h3>
            <p>{reportData.generatedText}</p>
          </div>
        </>
      ) : (
        <div className="error-message">Report not available</div>
      )}
    </div>
  );
};

export default Report;