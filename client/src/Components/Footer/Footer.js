import React from 'react';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left */}
        <div className="footer-section">
          <h3 className="footer-logo">VoxUp</h3>
          <p className="footer-description">
            Empowering the next generation of coders with voice-controlled learning.
          </p>
        </div>

        {/* Middle */}
        <div className="footer-section">
          <h5 className="footer-title">Quick Links</h5>
          <ul className="footer-links">
            {["about", "contact", "privacy", "terms"].map((page, i) => (
              <li key={i}><a href={`/${page}`}>{page[0].toUpperCase() + page.slice(1).replace('-', ' ')}</a></li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="footer-section">
          <h5 className="footer-title">Follow Us</h5>
          <div className="social-icons">
            {[
              { href: "https://facebook.com", icon: "facebook-square" },
              { href: "https://twitter.com", icon: "twitter-square" },
              { href: "https://instagram.com", icon: "instagram-square" },
              { href: "https://linkedin.com", icon: "linkedin" },
            ].map((social, i) => (
              <a key={i} href={social.href} target="_blank" rel="noopener noreferrer">
                <i className={`fab fa-${social.icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {year} VoxUp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
