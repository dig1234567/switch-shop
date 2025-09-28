import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Link } from "react-router-dom";
import img1 from "../img/1.png";
import imgC0 from "../img/C0.jpg";
import img7 from "../img/7.png";
import Mario from "../design/chara_mario.png";
import authService from "../services/auth-service";
const GameComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
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
  const product = {
    id: 101,
    name: "福爾摩斯大對決",
    price: 690,
  };

  const product1 = {
    id: 102,
    name: "萬貓的慶典",
    price: 820,
  };

  const product2 = {
    id: 103,
    name: "萬貓的慶典+福爾摩斯大對決",
    price: 1510,
  };

  const handleBuy = (item) => {
    navigate("/shop", { state: { product: item } });
  };
  return (
    <>
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
              <div class="nav_item">
                <span>遊戲</span>
                <span class="text_en">Game</span>
                <div class="nav_child">
                  <a href="#">
                    萬貓的慶典 <br />
                    Festival of Thousand Cats
                  </a>
                  <a href="#">
                    福爾摩斯大對決 <br />
                    Holmes : Sherlock &amp; Mycroft
                  </a>
                </div>
              </div>
            </li>
            <li>
              <Link class="nav_item" to="/shop">
                <span>商店</span>
                <span class="text_en">Shop</span>
              </Link>
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

        <div class="game_content">
          <p>
            歡迎來到此張文傑網路商店！在這裡您可以找到我們嚴選的出版品，預購期間享有優惠，敬請把握機會！本次商店為慶祝《福爾摩斯大對決》上市，優惠期間為9/16-10/6，優惠期間享免運優惠。選定您喜歡的方案，點選右側「立即購買」按鈕結帳，對結帳程序有問題可以來信詢問：hl096066@gmail.com
          </p>
          <div class="item">
            <div class="item_left">
              <img src={img1} alt="" />
            </div>
            <div class="item_mid">
              <h2>
                福爾摩斯大對絕 <br />
                Holmes: Sherlock & Mycroft
              </h2>
              <p>建議售價 690</p>
            </div>
            <div class="item_right">
              <div class="item_title">商品說明</div>
              <div class="item_child">
                <div class="item_child_left">
                  <div class="price_text">基本遊戲/特價 780</div>
                  <div class="game_text">1套主遊戲</div>
                  <div class="game_text">一個貓咪紙版立牌</div>
                </div>
                <div class="item_child_right">
                  <a onClick={() => handleBuy(product)} class="buy_btn">
                    立即購買
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <img src={imgC0} alt="" />
            </div>
            <div class="item_mid">
              <h2>
                萬貓的慶典
                <br />
                Festival of Thousand Cats
              </h2>
              <p>建議售價820</p>
            </div>
            <div class="item_right">
              <div class="item_title">
                <div>商品說明</div>
              </div>
              <div class="item_child">
                <div class="item_child_left">
                  <div class="price_text">基本遊戲/特價590</div>
                  <div class="game_text">1套主遊戲</div>
                  <div class="game_text">1個貓咪紙板立牌</div>
                </div>
                <div class="item_child_right">
                  <a onClick={() => handleBuy(product1)} class="buy_btn">
                    立即購買
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <img src={img7} alt="" />
            </div>
            <div class="item_mid">
              <h2>萬貓的慶典 + 福爾摩斯大對決</h2>
              <p>建議售價1510</p>
            </div>
            <div class="item_right">
              <div class="item_title">
                <div class="price_text">商品說明</div>
              </div>
              <div class="item_child">
                <div class="item_child_left">
                  <div class="game_text">同捆方案/特價1280</div>
                  <div class="game_text">1套福爾摩斯大對決主遊戲</div>
                  <div class="game_text">1套萬貓的慶典主遊戲</div>
                  <div class="game_text">1張預購贈品米寶貼</div>
                  <div class="game_text">1張貓咪紙板立牌</div>
                  <div class="game_text">
                    1份酒杯擴充牌
                    <br />
                    (需搭配主遊戲)
                  </div>
                </div>
                <div class="item_child_right">
                  <a onClick={() => handleBuy(product2)} class="buy_btn">
                    立即購買
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div class="footer_wrap">
          <ul>
            <li>
              <a href="https://www.facebook.com/zhang.wen.jie.95155?locale=zh_TW">
                Facebook
              </a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
          <div>2025 張文傑的switch小商城</div>
        </div>
      </footer>
    </>
  );
};

export default GameComponent;
