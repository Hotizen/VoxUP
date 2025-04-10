import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeroSection from '../Herosection/HeroSection';
import ThreeColumnSection from '../Threecolumns/ThreeColumnSection';
import Footer from '../Footer/Footer';
import './PersonalHome.css';

const PersonalHome = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('User');
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    if (!token) {
      navigate('/login'); // Redirect if not logged in
      return;
    }

    setUsername(storedUsername || 'User');

    const fetchUserData = async () => {
      try {
        const res = await axios.get('${API_BASE_URL}/progress/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userProgress = res.data.progress;
        setPoints(userProgress.points || 0);
        setProgress(Math.min(100, Math.round((userProgress.completedLessons?.length || 0) / 10 * 100)));

        const badgeList = [];
        if (userProgress.points >= 10) badgeList.push('Beginner');
        if (userProgress.points >= 50) badgeList.push('Python Pro');
        if (userProgress.points >= 100) badgeList.push('Logic Master');
        setBadges(badgeList);
      } catch (err) {
        console.error('Failed to fetch progress:', err);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div>
      <HeroSection />

      <div className="container text-center mt-4">
        <h2>Welcome back, {username}! 👋</h2>
        <h4>🔥 Your Points: {points}</h4>

        <div className="my-3">
          <h5>🏅 Badges:</h5>
          {badges.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {badges.map((badge, i) => (
                <li key={i}>{badge}</li>
              ))}
            </ul>
          ) : (
            <p>No badges earned yet</p>
          )}
        </div>

        <div className="progress my-3">
          <div
            className="progress-bar bg-success"
            style={{ width: `${progress}%` }}
            role="progressbar"
          >
            {progress}%
          </div>
        </div>

        <ThreeColumnSection />

        <div className="row mt-5">
          {/* Lessons */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Lessons</h5>
                <p className="card-text">Explore coding lessons tailored for you.</p>
                <button className="btn btn-primary" onClick={() => navigate('/lessons')}>
                  Explore Lessons
                </button>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Progress</h5>
                <p className="card-text">Track your coding journey.</p>
                <button className="btn btn-primary" onClick={() => navigate('/progress')}>
                  View Progress
                </button>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Leaderboard</h5>
                <p className="card-text">See where you stand among peers.</p>
                <button className="btn btn-primary" onClick={() => navigate('/leaderboard')}>
                  View Leaderboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PersonalHome;
