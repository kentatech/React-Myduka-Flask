import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    setMessage(false);

    if (!username || !email || !password) {
      setMessage(true);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      alert("Registration successful! You can now log in with your credentials.");
      window.location.href = "/login"; // adjust as needed
    } catch (error) {
      console.error("There was an error!", error);
      // Optionally: show user-visible error message
    }
  };

  return (
    <>
    <Navbar />
    <div
      style={{
        backgroundImage: "url('4885247.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        className="register-card bg-white bg-opacity-15 p-5 rounded-4 shadow-lg text-dark"
        style={{
          backdropFilter: "blur(15px)",
          maxWidth: "420px",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        <h2 className="text-center mb-4 fw-bold">
          <i className="bi bi-person-plus-fill"></i> Create an Account
        </h2>
        <form onSubmit={registerUser}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-medium">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-medium">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-medium">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-warning w-100 fw-bold">
            Register
          </button>
          {message && (
            <p className="text-danger text-center mt-2">All fields are required.</p>
          )}
          <div className="login-link text-center mt-3">
            <p>
              Already have an account? <a href="/login">Login here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Register;
