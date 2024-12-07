import React, { useEffect } from 'react';
import './LogoAnimation.css';
import { useNavigate } from 'react-router-dom';

const LogoAnimation = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => navigate('/login'), 3000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="logo-animation-container">
            <img
                src="/path-to-logo/logo.png"
                alt="Logo"
                className="logo-animation"
            />
        </div>
    );
};

export default LogoAnimation;
