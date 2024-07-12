

// App.js
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Otp from './pages/Otp';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';
import Headers from './components/Headers';
import Deeplearning from './pages/Deeplearning';
import Llm from './pages/Llm';
import TestPage from './pages/TestPage'
import TestDL from './pages/TestDL';
import './App.css';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userValid = () => {
      let token = localStorage.getItem("userdbtoken");
      if (token) {
        const allowedRoutes = ["/dashboard", "/llm", "/deeplearning","/register","/test", "/testdl"];
        if (!allowedRoutes.includes(location.pathname)) {
          navigate("/dashboard");
        }
      } else {
        // Navigate to multiple accessible routes when not logged in
        const accessibleRoutes = ["/", "/register", "/user/otp"];
        if (!accessibleRoutes.includes(location.pathname)) {
          navigate("/");
        }
      }
    };

    userValid();
  }, [location, navigate]);

  return (
    <div>
      <Headers />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/otp" element={<Otp />} />
        <Route path="/llm" element={<Llm />} />
        <Route path="/deeplearning" element={<Deeplearning />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test" element={<TestPage />} />
        <Route path='/testdl' element = {<TestDL/>}/>
      </Routes>
    </div>
  );
};

export default App;
