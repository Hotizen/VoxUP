import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });

      alert(response.data.message);

      // ✅ Store token in localStorage
      localStorage.setItem('token', response.data.token);

      // ✅ Redirect to personal home screen
      navigate('/personal-home');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed.');
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        username,
        password,
      });

      alert(response.data.message);

      // After signup, log in the user
      handleLogin(); 
    } catch (error) {
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

        <button className="main-button" onClick={isSignUp ? handleSignUp : handleLogin}>
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>

        <div className="social-login">
          <p>Or log in with:</p>
          <div className="social-icons">
            <i className="fab fa-google" title="Google" onClick={() => handleSocialLogin('Google')}></i>
            <i className="fab fa-facebook" title="Facebook" onClick={() => handleSocialLogin('Facebook')}></i>
            <i className="fab fa-twitter" title="Twitter" onClick={() => handleSocialLogin('Twitter')}></i>
          </div>
        </div>

        <p className="toggle-mode">
          {isSignUp ? 'Already have an account?' : 'Don’t have an account?'}{' '}
          <span onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
