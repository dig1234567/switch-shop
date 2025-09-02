const router = require("express").Router();
const jwt = require("jsonwebtoken");
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models/user-model");

router.use((req, res, next) => {
  console.log("正在經過auth路徑.....");
  next();
});

// 註冊會員Router
router.post("/register", async (req, res) => {
  // 確認數據是否符合規範
  let { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //確認信箱有無註冊過
  const emailCheck = await User.findOne({ email: req.body.email });
  if (emailCheck) {
    return res.status(400).send("此信箱已被註冊過了.....");
  }
  let { username, email, password } = req.body;
  let newUser = new User({ username, email, password }); // 創建新用戶
  console.log("接收此新用戶資訊", req.body);
  //儲存用戶
  try {
    let saveUser = await newUser.save();
    return res.send({
      msg: "資料已儲存在資料庫",
      saveUser,
    });
  } catch (e) {
    return res.status(500).send("無法儲存使用者....");
  }
});

// 登入會員Router
router.post("/login", async (req, res) => {
  // 確認數據是否符合規範
  let { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 確認有無使用者
  const checkUser = await User.findOne({ email: req.body.email });
  if (!checkUser) {
    return res.status(401).send("無使用者存在請重新註冊新用戶....");
  }

  //比較密碼
  checkUser.comparePassword(req.body.password, (err, isMatch) => {
    if (err) return res.status(500).send(err);
    // 製作Json web token
    if (isMatch) {
      const tokenObject = {
        _id: checkUser._id,
        email: checkUser.email,
      };
      const token = jwt.sign(tokenObject, process.env.JWT_SECRET);
      return res.send({
        msg: "成功登入",
        token: token,
        user: checkUser,
      });
    } else {
      return res.status(401).send("密碼錯誤..");
    }
  });
});
module.exports = router;
