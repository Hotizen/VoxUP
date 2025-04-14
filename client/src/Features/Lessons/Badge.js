import React from 'react';

const Badge = ({ title, earned }) => {
    const badgeStyle = {
        padding: '10px',
        margin: '5px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: earned ? '#d4edda' : '#f8d7da',
        transition: 'background-color 0.3s ease', // Smooth transition for the background color
    };

    return (
        <div style={badgeStyle}>
            <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{title}</h4>
            <p style={{ margin: '5px 0 0', color: earned ? '#155724' : '#721c24', fontSize: '1rem' }}>
                {earned ? 'Earned' : 'Not Earned Yet'}
            </p>
        </div>
    );
};

export default Badge;
