require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./router").auth;
const payRouter = require("./router").pay;
const cors = require("cors");

// Connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB 已連接"))
  .catch((err) => console.error("MongoDB 連線失敗", err));

//middleware
//提供React靜態網頁
app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://switch-shop.onrender.com",
  })
);

// API Router
app.use("/api/user/pay", payRouter);
app.use("/api/user", authRouter);

app.get("/", (req, res) => {
  res.send("歡迎來到首頁....");
});

// 與之前版本不同：Express v5 不能用 '*'，必須命名 wildcard
app.get('/*splat', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  } else {
    res.status(404).send("Not Found");
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
