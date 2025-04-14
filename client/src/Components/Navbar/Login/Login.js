import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = async () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      alert('Please enter both username and password.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username: trimmedUsername,
        password: trimmedPassword,
      });

      alert(response.data.message);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', trimmedUsername);

      navigate('/personal-home');
    } catch (error) {
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'Login failed.');
    }
  };

  const handleSignUp = async () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      alert('Please enter both username and password.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        username: trimmedUsername,
        password: trimmedPassword,
      });

      alert(response.data.message);

      // Auto-login after successful signup
      await handleLogin();
    } catch (error) {
      console.error('Signup error:', error);
      alert(error.response?.data?.message || 'Signup failed.');
    }
  };

  const handleSocialLogin = (platform) => {
    alert(`${platform} login is not available at the moment.`);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">
          {isSignUp ? 'Create an Account' : 'Welcome Back!'}
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

        <button
          className="main-button"
          onClick={isSignUp ? handleSignUp : handleLogin}
          disabled={!username.trim() || !password.trim()}
        >
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>

        <div className="social-login">
          <p>Or log in with:</p>
          <div className="social-icons">
            <i
              className="fab fa-google"
              title="Google"
              onClick={() => handleSocialLogin('Google')}
            ></i>
            <i
              className="fab fa-facebook"
              title="Facebook"
              onClick={() => handleSocialLogin('Facebook')}
            ></i>
            <i
              className="fab fa-twitter"
              title="Twitter"
              onClick={() => handleSocialLogin('Twitter')}
            ></i>
          </div>
        </div>

        <p className="toggle-mode">
          {isSignUp ? 'Already have an account?' : 'Don’t have an account?'}{' '}
          <span
            id={isSignUp ? 'switch-to-login' : 'switch-to-signup'}
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
