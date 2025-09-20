import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import AuthService from "../services/auth-service";
import Mario from "../design/chara_mario.png";
import { useNavigate } from "react-router-dom";

const NavComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    window.alert("導向登入頁面...");
    navigate("/login");
  };

  const handleRegister = () => {
    window.alert("導向註冊頁面...");
    navigate("/register");
  };

  const handleLogout = () => {
    AuthService.logout(); // 如果你有登出邏輯，這裡可加上清除 localStorage
    localStorage.removeItem("user");
    setCurrentUser(null);
    window.alert("登出成功！");
    navigate("/");
  };

  return (
    <div className="main">
      <header>
        <img className="logo" src={Mario} alt="Logo" />

        {!currentUser && (
          <>
            <button onClick={handleLogin} className="nav_btn">
              登入
            </button>
            <button onClick={handleRegister} className="nav_btn">
              註冊
            </button>
          </>
        )}

        {currentUser && (
          <button onClick={handleLogout} className="nav_btn">
            登出
          </button>
        )}
      </header>
    </div>
  );
};

export default NavComponent;
