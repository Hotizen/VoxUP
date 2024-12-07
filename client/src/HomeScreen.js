import React from 'react';
import './HomeScreen.css';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="home-screen">
            <h1>Main Menu</h1>
            <div className="menu-options">
                <button onClick={() => navigate('/lessons')}>Lessons</button>
                <button onClick={() => navigate('/progress')}>Progress</button>
                <button onClick={() => navigate('/leaderboard')}>Leaderboard</button>
                <button onClick={() => navigate('/settings')}>Settings</button>
                <button onClick={() => alert('Voice Commands Activated!')}>
                    Turn on Voice Commands
                </button>
            </div>
        </div>
    );
};

export default HomeScreen;
