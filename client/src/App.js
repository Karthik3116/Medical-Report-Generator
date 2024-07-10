import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Otp from './pages/Otp';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';
import Headers from './components/Headers';
import Deeplearning from './pages/Deeplearning';
import Llm from './pages/Llm';
import './App.css';

const App = () => {
//   const location = useLocation();
//   const showHeader = location.pathname === '/' || location.pathname === '/register' || location.pathname === '/user/otp';

  return (
    <div>
      {/* {showHeader && <Headers />} */}
      <Headers/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user/otp" element={<Otp />} />
        <Route path="/llm" element={<Llm />} />
        <Route path="/deeplearning" element={<Deeplearning />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
