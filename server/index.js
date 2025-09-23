const cors = require("cors");
require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const authRouter = require("./router").auth;
const payRouter = require("./router").pay;

const app = express();

// ✅ CORS 最先掛上
app.use(
  cors({
    origin: "https://switch-shop.onrender.com", // 允許的網域
    credentials: true,
  })
);

// ✅ middleware 再來
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB 已連接"))
  .catch((err) => console.error("MongoDB 連線失敗", err));

// ✅ API Router（這些都會套用上方的 CORS）
app.use("/api/user/pay", payRouter);
app.use("/api/user", authRouter);

// ✅ React 靜態網頁
// ✅ 靜態檔案（React Build）
app.use(express.static(path.join(__dirname, "../client/build")));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


// ✅ Server 啟動
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
