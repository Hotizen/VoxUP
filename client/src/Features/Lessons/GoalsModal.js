import React, { useState } from 'react';
import './Goals.css';

const GoalsModal = ({ show, onClose }) => {
  const [goal, setGoal] = useState('');

  const handleSetGoal = () => {
    alert(`Your goal "${goal}" has been saved.`);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Set Your Goal</h3>
        <input
          type="text"
          placeholder="Enter your goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <button onClick={handleSetGoal} className="btn btn-success mt-2">
          Save Goal
        </button>
        <button onClick={onClose} className="btn btn-danger mt-2">
          Close
        </button>
      </div>
    </div>
  );
};

export default GoalsModal;
