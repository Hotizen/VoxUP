import React from 'react';
import Navbar from '../../Navbar/Navbar'; // Keep navbar with other options
import './PersonalHome.css';

const PersonalHome = () => {
  return (
    <div>
      <Navbar />
      <div className="container text-center mt-4">
        <h2>Welcome to Your Dashboard</h2>
        <p>Explore lessons, track progress, and stay ahead!</p>
        <div className="row mt-5">
          {/* Cards for Lessons, Progress, Leaderboard */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Lessons</h5>
                <p className="card-text">Explore coding lessons tailored for you.</p>
                <button className="btn btn-primary">Explore Lessons</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Progress</h5>
                <p className="card-text">Track your coding journey.</p>
                <button className="btn btn-primary">View Progress</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Leaderboard</h5>
                <p className="card-text">See where you stand among peers.</p>
                <button className="btn btn-primary">View Leaderboard</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalHome;
