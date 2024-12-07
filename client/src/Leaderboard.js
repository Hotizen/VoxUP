import React from 'react';

const Leaderboard = ({ players }) => {
    const sortedPlayers = [...players].sort((a, b) => b.points - a.points);

    return (
        <div>
            <h3>Leaderboard</h3>
            <ol>
                {sortedPlayers.map((player, index) => (
                    <li key={index}>
                        {player.name}: {player.points} points
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Leaderboard;
