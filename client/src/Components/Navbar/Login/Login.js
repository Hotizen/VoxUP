import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async () => {
    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }
  
    try {
      const endpoint = isSignUp ? "/auth/register" : "/auth/login";
      const response = await axios.post(`http://localhost:5000${endpoint}`, {
        username,
        password,
      });
  
      alert(response.data.message);
  
      if (!isSignUp) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", username); // ✅ Store username in localStorage
        navigate("/profile");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };
  
  // Guest Login Handler
  const handleGuestLogin = () => {
    alert("Logged in as Guest!");
    navigate("/profile"); // Direct access to profile
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">
          {isSignUp ? "Create an Account" : "Welcome Back!"}
        </h1>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="main-button" onClick={handleAuth}>
          {isSignUp ? "Sign Up" : "Login"}
        </button>

        {/* Guest Login Button Moved Below */}
        <button className="guest-button" onClick={handleGuestLogin}>
          Continue as Guest
        </button>

        <p className="toggle-mode">
          {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
          <span onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
