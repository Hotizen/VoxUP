import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../Assets/images/voxup-logo.png';

const Navbar = ({ toggleVoiceControl, isListening }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/about">
          <img src={logo} alt="VoxUp Logo" width="120" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link login-btn" to="/login">Login/Sign In</Link>
            </li> 
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
