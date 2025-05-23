import React, { useEffect, useState } from 'react';
import './Leaderboard.css';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const Leaderboard = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/progress/leaderboard`);
        setPlayers(response.data.leaderboard);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-container">
      <h3>🏆 Leaderboard</h3>
      {players.length > 0 ? (
        <ul>
          {players.map((player, index) => (
            <li key={index} className={`leaderboard-item rank-${index + 1}`}>
              <span className="rank">#{index + 1}</span>
              <span className="player-name">{player.username}</span>
              <span className="player-points">{player.points} pts</span>
              <span className="player-level">Level {Math.floor(player.points / 50) + 1}</span>
              <span className="player-streak">🔥 {Math.floor(player.points / 20)} Days</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-leaderboard">No data available</div>
      )}
    </div>
  );
};

export default Leaderboard;
