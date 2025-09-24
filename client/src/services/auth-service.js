// 所有認證Route都會經過此認證
import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://switch-shop-1.onrender.com/api/user" // ← 改成你的正確後端網址
    : "http://localhost:10000/api/user";


class AuthService {
  login(email, password) {
    return axios.post(
      API_URL + "/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
  }
  register(username, email, password) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
    });
  }
  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
