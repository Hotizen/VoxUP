import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and sign-up modes

  // Validate email format
  const isEmailValid = (email) => {
    return email.endsWith('@gmail.com');
  };

  const handleLogin = () => {
    if (!isEmailValid(email)) {
      alert('Please use a valid @gmail.com email address.');
      return;
    }
    if (email && password) {
      alert('Login Successful!');
      navigate('/personal-home'); // Redirect to personal home screen
    } else {
      alert('Please enter valid credentials.');
    }
  };

  const handleSignUp = () => {
    if (!isEmailValid(email)) {
      alert('Please use a valid @gmail.com email address.');
      return;
    }
    if (email && password) {
      alert('Account created successfully!');
      navigate('/personal-home'); // Redirect to personal home screen
    } else {
      alert('Please fill out all fields to create an account.');
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
          type="email"
          placeholder="Enter Email (e.g., yourname@gmail.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={isSignUp ? handleSignUp : handleLogin}>
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
          <span onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
