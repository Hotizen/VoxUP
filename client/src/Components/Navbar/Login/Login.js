import React, { useState, useMemo } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const trimmedUsername = useMemo(() => username.trim(), [username]);
  const trimmedPassword = useMemo(() => password.trim(), [password]);

  const handleAuth = async (type) => {
    if (!trimmedUsername || !trimmedPassword) {
      alert('Please enter both username and password.');
      return;
    }

    const endpoint = type === 'login' ? '/auth/login' : '/auth/register';

    try {
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, {
        username: trimmedUsername,
        password: trimmedPassword,
      });

      alert(response.data.message);

      if (type === 'register') {
        await handleAuth('login');
        return;
      }

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', trimmedUsername);
      navigate('/personal-home');
    } catch (error) {
      console.error(`${type} error:`, error);
      alert(error.response?.data?.message || `${type} failed.`);
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
          onClick={() => handleAuth(isSignUp ? 'register' : 'login')}
          disabled={!trimmedUsername || !trimmedPassword}
        >
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>

        <div className="social-login">
          <p>Or log in with:</p>
          <div className="social-icons">
            {['Google', 'Facebook', 'Twitter'].map((platform) => (
              <i
                key={platform}
                className={`fab fa-${platform.toLowerCase()}`}
                title={platform}
                aria-label={`${platform} login`}
                onClick={() => handleSocialLogin(platform)}
              />
            ))}
          </div>
        </div>

        <p className="toggle-mode">
          {isSignUp ? 'Already have an account?' : 'Don’t have an account?'}{' '}
          <span
            id={`switch-to-${isSignUp ? 'login' : 'signup'}`}
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
