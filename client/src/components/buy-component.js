import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Mario from "../design/chara_mario.png";
import authService from "../services/auth-service";
import payService from "../services/pay-service";
import { useLocation, Navigate } from "react-router-dom";

const BuyComponent = ({ currentUser, setCurrentUser }) => {
  const location = useLocation();
  const paymentData = location.state;
  const userData = localStorage.getItem("user");
  if (!userData || !paymentData) {
    // 未登入或未付款成功，導向首頁
    return <Navigate to="/" replace />;
  }

  const { productName, price } = paymentData;

  const handleButton = () => {
    Navigate("/login");
  };

  const handleLogin = () => {
    alert("正在導向至登入頁面...");
    Navigate("/login");
  };

  const handleRegister = () => {
    alert("正在導向至註冊頁面...");
    Navigate("/register");
  };

  const handleLogout = () => {
    authService.logout(); // 清空 LocalStorage
    window.alert("登出成功，現在你會被導向到首頁...");
    setCurrentUser(null);
    Navigate("/");
  };

  return (
    <div>
      <div className="main">
        <header>
          <img className="logo" src={Mario} alt="logo" />
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

      {!currentUser && (
        <div style={{ marginLeft: "30rem", fontSize: "1.5rem" }}>
          <p>您必須先登入才能看到已購買的商品</p>
          <button onClick={handleButton}>回到登入頁面</button>
        </div>
      )}
      <div style={{ marginLeft: "500px", fontSize: "1.5rem" }}>
        <h2>🎉 付款成功！</h2>
        <p>商品名稱：{productName}</p>
        <p>金額：${price}</p>
      </div>
    </div>
  );
};

export default BuyComponent;
