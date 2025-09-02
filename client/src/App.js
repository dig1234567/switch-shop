import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomeComponent from "./components/home-component";
import GameComponent from "./components/game-component";
import ShopComponent from "./components/shop-component";
import LoginComponent from "./components/login-component";
import RegisterComponent from "./components/register-component";
import BuyComponent from "./components/buy-component";
import ProfileComponent from "./components/profile-component";
import AuthService from "./services/auth-service";
import Layout from "./components/Layout";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        />
        <Route
          path="/game"
          element={
            <GameComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/shop"
          element={
            <ShopComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/Login"
          element={
            <LoginComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route path="/register" element={<RegisterComponent />} />
        <Route
          path="/shopping"
          element={
            <BuyComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProfileComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
