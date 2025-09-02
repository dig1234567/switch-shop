import React, { useState } from "react";
import authService from "../services/auth-service";
import { useNavigate } from "react-router-dom";

function LoginComponent({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleButton = async (e) => {
    e.preventDefault(); // <--- 這是關鍵！
    try {
      let response = await authService.login(email, password);
      localStorage.setItem(
        "user",
        JSON.stringify({
          user: response.data.user,
          token: response.data.token,
        })
      );
      window.alert("登入成功, 您即將被導向到個人資料頁面....");
      navigate("/profile");
      setCurrentUser(authService.getCurrentUser());
    } catch (e) {
      const errorMsg = e?.response?.data || "登入失敗，請稍後再試";
      setMessage(errorMsg);
      console.error("登入錯誤：", e);
    }
  };
  return (
    <div style={styles.container}>
      {message && <div className="alert alert-danger">{message}</div>}
      <h2>登入</h2>
      <form style={styles.form}>
        <input
          type="email"
          placeholder="電子郵件"
          onChange={handleEmail}
          value={email}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="密碼"
          onChange={handlePassword}
          value={password}
          style={styles.input}
          required
        />
        <button onClick={handleButton} type="submit" style={styles.button}>
          登入
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: "300px",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "10px",
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default LoginComponent;
