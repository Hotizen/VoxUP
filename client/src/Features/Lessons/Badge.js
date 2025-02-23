import React from 'react';

const Badge = ({ title, earned }) => {
    return (
        <div style={{ padding: '10px', margin: '5px', border: '1px solid #ddd', borderRadius: '5px', background: earned ? '#d4edda' : '#f8d7da' }}>
            <h4>{title}</h4>
            <p>{earned ? 'Earned' : 'Not Earned Yet'}</p>
        </div>
    );
};

export default Badge;
