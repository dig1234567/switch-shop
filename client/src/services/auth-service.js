// 所有認證Route都會經過此認證
import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://switch-you-xi-shang-cheng.onrender.com/api/user"
    : "http://localhost:10000/api/user";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", {
      email,
      password,
    });
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
