import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../Assets/images/voxup-logo.png';

const Navbar = ({ toggleVoiceControl, isListening }) => {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/about">
          <img src={logo} alt="VoxUp Logo" className="navbar-logo" />
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
          <ul className="navbar-nav ms-auto align-items-center">

            <NavItem to="/" label="Home" />
            {isLoggedIn && <NavItem to="/profile" label="Profile" />}

            <NavItem to="/about" label="About" />

            <li className="nav-item">
              {isLoggedIn ? (
                <button onClick={handleLogout} className="nav-link logout-btn">
                  Logout
                </button>
              ) : (
                <Link to="/login" className="nav-link login-btn">
                  Login / Sign In
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ to, label }) => (
  <li className="nav-item">
    <Link className="nav-link" to={to}>{label}</Link>
  </li>
);

export default Navbar;
