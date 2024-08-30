// logoutUtils.js

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const handleLogout = () => {
  const [, removeCookie] = useCookies([]);
  const navigate = useNavigate();

  removeCookie("token");
  navigate("/");
};
