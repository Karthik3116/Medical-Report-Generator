import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import hamburger from '../assets/hamburgericon.png';
import '../styles/Header.scss';

const Header = () => {
  const [toggle, setToggle] = useState('');
  const [cookies, , removeCookie] = useCookies(['token', 'username']);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie('token');
    removeCookie('username');
    localStorage.removeItem('currentReport');
    navigate('/login');
  };

  return (
    <nav className="mynavbar">
      <div className="logo">
        <Link to="/">InsightXray</Link>
      </div>
      <ul className="links">
        <li>
          <Link to={"/login"}>Scan Chest X-ray</Link>
        </li>
        {/* <li>
          <Link to={"/xray"}>scan X-Ray</Link>
        </li> */}
        {/* <li>
          <Link to={"/services"}>Services</Link>
        </li>
        <li>
          <Link to={"/aboutUs"}>About Us</Link>
        </li> */}
        <li>
          <Link to={"/feedback"}>Feedback</Link>
        </li>
      </ul>
      {cookies.token && location.pathname === "/user" ? (
        <button className="action_btn" onClick={logout}>
          Logout
        </button>
      ) : (
        <Link className="action_btn" to={cookies.token ? "/user" : "/login"}>
          Login
        </Link>
      )}
      <div className="toggle_btn" onClick={handleToggleClick}>
        <img src={hamburger} height="40px" alt="menu" />
      </div>
      <div className={`dropdown_menu ${toggle}`}>
        <li>
          <Link onClick={handleLinkclick} to={"/login"}>
            scan X-Ray
          </Link>
        </li>
        <li>
          <Link onClick={handleLinkclick} to={"/aboutUs"}>
            About Us
          </Link>
        </li>
        <li>
          <Link onClick={handleLinkclick} to={"/feedback"}>
            Feedback
          </Link>
        </li>
        <li>
          {cookies.token && (location.pathname === "/user" || location.pathname === "/report") ? (
            <button className="action_btn" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link
              className="action_btn"
              to={cookies.token ? "/user" : "/login"}
            >
              Login
            </Link>
          )}
        </li>
      </div>
    </nav>
  );
};

export default Header;
