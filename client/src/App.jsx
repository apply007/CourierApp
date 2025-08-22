import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import TrackPage from "./pages/TrackPage.jsx";
import BookParcel from "./pages/BookParcel.jsx";
import Navbar from "./components/NavBar.jsx";
import Register from "./pages/Register.jsx";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleLogin = (t, u) => {
    localStorage.setItem("token", t);
    localStorage.setItem("user", JSON.stringify(u));
    setToken(t);
    setUser(u);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };
  return (
    <div style={{ fontFamily: "system-ui", padding: 16 }}>
      <Navbar token={token} onLogout={handleLogout} user={user} />
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            <LoginPage
              onLogin={handleLogin}
            />
          }
        />
        <Route path="/register" element={<Register />} />

        <Route
          path="/book"
          element={token ? <BookParcel /> : <Navigate to="/login" />}
        />
        <Route path="/track" element={<TrackPage />} />
      </Routes>
    </div>
  );
};
export default App;
