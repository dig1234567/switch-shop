import React from "react";
import "../App.css";
import img05 from "../img/0.5.png";
import img2 from "../img/2.png";
import { Link } from "react-router-dom";
const HomeComponent = ({ currentUser, setCurrentUser }) => {
  return (
    <div class="main">
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
      <div class="content">
        <img src={img05} alt="" />
        <img src={img2} alt="" />
      </div>
    </div>
  );
};

export default HomeComponent;
