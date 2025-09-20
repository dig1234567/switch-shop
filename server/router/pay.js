// 使用者付款Router
const router = require("express").Router();
const verifyToken = require("../config/authMiddleware");

router.use((req, res, next) => {
  console.log("進入付款Router.....");
  next();
});

router.post("/", verifyToken, async (req, res) => {
  // 處理付款邏輯
  const { card, safety, year, productName, price } = req.body;
  const userId = req.user.id; // 從 token 拿到的 id
  console.log(
    "使用者付款資訊",
    "卡號",
    card,
    "安全碼",
    safety,
    "到期年限",
    year
  );
  // 儲存資料到資料庫...
  res.status(200).json({ message: "付款成功", productName, price });
});

module.exports = router;
