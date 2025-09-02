const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({ message: "未提供 token" });
  }

  const token = authHeader.split(" ")[1];
  console.log("收到 token:", token);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("JWT 驗證失敗原因:", err.message);
      return res.status(401).json({ message: "Token 驗證失敗" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
