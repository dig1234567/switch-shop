import React from "react";
import { Link } from "react-router-dom";
import Mario from "../design/chara_mario.png";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth-service";
import "../style.css";

const ProfileComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    alert("正在導向至登入頁面...");
    navigate("/login");
  };

  const handleRegister = () => {
    alert("正在導向至註冊頁面...");
    navigate("/register");
  };

  const handleLogout = () => {
    authService.logout(); // 清空 LocalStorage
    window.alert("登出成功，現在你會被導向到首頁...");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <div>
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

        <nav>
          <ul>
            <li>
              <Link className="nav_item" to="/">
                <span>介紹</span>
                <span className="text_en">About</span>
              </Link>
            </li>
            <li>
              <Link className="nav_item" to="/game">
                <span>遊戲</span>
                <span className="text_en">Game</span>
              </Link>
            </li>
            <li>
              <Link className="nav_item" to="/shop">
                <span>商店</span>
                <span className="text_en">Shop</span>
              </Link>
            </li>
            <li>
              <Link className="nav_item" to="/shopping">
                <span>購買的商品</span>
              </Link>
            </li>
            <li>
              <Link className="nav_item" to="/profile">
                <span>個人資料</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="profile-container">
        {!currentUser && (
          <div style={{ fontSize: "2rem", marginLeft: "60px" }}>
            在獲取您的個人資料之前，您必須先登錄。
          </div>
        )}
        {currentUser && (
          <div>
            <h2>以下是您的個人檔案：</h2>

            <table className="table">
              <tbody>
                <tr>
                  <td>
                    <strong>姓名：{currentUser.user.username}</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>您的用戶ID: {currentUser.user._id}</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>您註冊的電子信箱: {currentUser.user.email}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileComponent;
