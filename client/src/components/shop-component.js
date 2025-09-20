import React, { useState } from "react";
import "../App.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Mario from "../design/chara_mario.png";
import authService from "../services/auth-service";
import PayService from "../services/pay-service";
const ShopComponent = ({ currentUser, setCurrentUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  let [card, setCard] = useState("");
  let [safety, setSafety] = useState("");
  let [year, setYear] = useState("");
  let [message, setMessage] = useState("");
  console.log("收到商品資料：", product); // ✅ 測試點
  if (!product) {
    return <p>沒有收到任何商品資訊</p>;
  }

  const handlelogin = () => {
    alert("正在導向至登入頁面...");
    navigate("/login");
  };

  const handleRegister = () => {
    alert("正在導向至註冊頁面..");
    navigate("/register");
  };
  const handleLogout = () => {
    authService.logout(); // 清空 LocalStorage
    window.alert("登出成功，現在你會被導向到首頁...");
    setCurrentUser(null);
    navigate("/");
  };

  const handleChangeCard = (e) => {
    setCard(e.target.value);
  };

  const handleChangeSafety = (e) => {
    setSafety(e.target.value);
  };

  const handleChangeYear = (e) => {
    setYear(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 阻止預設提交行為
    const paymenData = {
      card,
      safety,
      year,
      productName: product.name,
      price: product.price,
    };

    try {
      const res = await PayService.post(paymenData);
      // 導向 shopping 並傳送資訊
      navigate("/shopping", {
        state: res.data,
      });
    } catch (err) {
      console.error("付款失敗：", err.response?.data || err.message);
      setMessage("付款失敗，請檢查您的資料。");
    }
  }; // ✅ 補上這個結尾
  return (
    <div>
      <div class="main">
        <header>
          <img class="logo" src={Mario} alt="" />
          {!currentUser && (
            <>
              <button onClick={handlelogin} className="nav_btn">
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
              <Link class="nav_item" to="/">
                <span>介紹</span>
                <span class="text_en">About</span>
              </Link>
            </li>
            <li>
              <Link class="nav_item" to="/game">
                <span>遊戲</span>
                <span class="text_en">Game</span>
              </Link>
            </li>
            <li>
              <a class="nav_item" href="#">
                <span>商店</span>
                <span class="text_en">Shop</span>
              </a>
            </li>
            <li>
              <Link class="nav_item" to="/shopping">
                <span>購買的商品</span>
              </Link>
            </li>
            <li>
              <Link class="nav_item" to="/profile">
                <span>個人資料</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div style={{ marginLeft: "250px" }}>
          <h2 style={{ fontSize: "2rem" }}>結帳頁面</h2>
          <p style={{ fontSize: "1.5rem" }}>您購買的是：</p>
          <p>商品名稱：{product.name}</p>
          <p>價格：{product.price}</p>
          <button onClick={() => navigate("/")}>回到首頁</button>
        </div>

        <form onSubmit={handleSubmit}>
          <label for="Card">輸入你的信用卡號或簽帳卡</label> <br />
          <input
            type="text"
            id="card"
            name="card"
            onChange={handleChangeCard}
            placeholder="信用卡號或簽帳卡"
          />
          <br />
          <label for="Safety">輸入安全碼</label> <br />
          <input
            type="text"
            id="safety"
            name="safety"
            onChange={handleChangeSafety}
            placeholder="安全碼"
          />
          <br />
          <label for="Year">輸入到期年份</label> <br />
          <input
            type="text"
            id="year"
            name="year"
            onChange={handleChangeYear}
            placeholder="到期年份"
          />
          <br />
          <button style={{ fontWeight: "bold" }}>立即付款</button>
        </form>
      </div>
    </div>
  );
};

export default ShopComponent;
