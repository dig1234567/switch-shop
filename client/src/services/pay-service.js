import axios from "axios";
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://switch-you-xi-shang-cheng.onrender.com/api/user/pay"
    : "http://localhost:10000/api/user/pay";
class PayService {
  // 使用者付款經過的處理
  post(paymentData) {
    const userData = localStorage.getItem("user");
    let token = "";
    if (userData) {
      token = JSON.parse(userData).token;
    }

    return axios.post(API_URL, paymentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  // 尋找已購買的商品
  get() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`, // <-- 加上 Bearer
        "Content-Type": "application/json",
      },
    });
  }
}

export default new PayService();
