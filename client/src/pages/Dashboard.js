import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const userValid = () => {
    let token = localStorage.getItem("userdbtoken");
    if (token) {
        console.log("user valid");
    } else {
        navigate("*");
    }
};

useEffect(() => {
    userValid();
}, );

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h1>Home Page</h1>
        <div className="button" onClick={() => navigate("/llm")}>1. Large Language Model (LLM )</div>
        {/* <div className="button" onClick={() => navigate("/llm2")}>2. Large Language Model 2 (LLM 2)</div> */}
        <div className="button" onClick={() => navigate("/deeplearning")}>2. Deep Learning (DL)</div>
      </div>
    </div>
  );
};

export default Dashboard;
