// src/components/LoginForm.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import bckimg from "../4885247.jpg";

const Login = () => {
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Email and password are required.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // try to read error message from server
        const err = await response.json();
        throw new Error(err.error || "Login failed");
      }

      const data = await response.json();
      console.log(data);

      // e.g. assuming server returns a token
      localStorage.setItem("token", data.token);

      alert("Login successful!");
      // handle redirect — you might want to use react-router instead:
      const params = new URLSearchParams(window.location.search);
      const nextPage = params.get("next") || "/dashboard";
      window.location.href = nextPage;
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg(err.message || "An error occurred during login.");
    }
  };

  return (
    <>
    <Navbar />
    <div
      style={{
        backgroundImage: `url(${bckimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div className="login-card bg-white bg-opacity-75 p-5 rounded-4 shadow-lg text-dark" style={{ maxWidth: "420px", margin: "80px auto", backdropFilter: "blur(15px)", border: "1px solid rgba(255,255,255,0.4)" }}>
        <h2 className="text-center mb-4 fw-semibold">
          <i className="bi bi-box-arrow-in-right"></i> Login
        </h2>
        <form onSubmit={loginUser}>
          <div className="mb-1">
            <label htmlFor="email" className="form-label fw-medium">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-medium">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-success w-100 fw-bold">
            <i className="bi bi-box-arrow-in-right"></i> Login
          </button>

          {errorMsg && (
            <p className="text-danger text-center mt-3">{errorMsg}</p>
          )}

          <div className="register-link text-center mt-3">
            <p>
              Don't have an account? <a href="/register">Register here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Login;
