import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";
import FileUpload from "../components/FileUpload";
// import Addinfo from "../components/Addinfo";
import RecentsTab from "../components/RecentsTab";

import "../styles/usertest.scss";

const User = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000/auth",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const handleLogout = () => {
    removeCookie("token");
    navigate("/signup");
  };
  const handleClick = () => {
    navigate('/allreports',{ state: { username:username } });
  };
  return (
    <>
      <Header logout={handleLogout} />
      <div className="home_page">
        <h4>
          Welcome back <span>{username.toUpperCase()}</span>
        </h4>
        <div className="layout">
          <div className="leftlayou">
            <div className="recent-tab">
              <RecentsTab username={username} />
            </div>
            <div className="allreports" onClick={handleClick} >
              <h5>All reports</h5>
            </div>
          </div>
          <div className="file-upload">
            <FileUpload username={username} />
          </div>
        </div>
      </div>
    </>
  );
};
export default User;
