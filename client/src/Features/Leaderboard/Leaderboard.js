import React from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const players = [
    { name: 'Alice', points: 150, level: 3, streak: 5 },
    { name: 'Bob', points: 120, level: 2, streak: 4 },
    { name: 'Charlie', points: 110, level: 2, streak: 6 },
    { name: 'Dave', points: 90, level: 1, streak: 2 },
    { name: 'Eve', points: 80, level: 1, streak: 3 },
  ];

  return (
    <div className="leaderboard-container">
      <h3>Leaderboard</h3>
      {players.length > 0 ? (
        <ul>
          {players.map((player, index) => (
            <li key={index}>
              <span className="rank">{index + 1}</span>
              <span className="player-name">{player.name}</span>
              <span className="player-points">{player.points} pts</span>
              <span className="player-level">Level {player.level}</span>
              <span className="player-streak">{player.streak} Days</span>
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
