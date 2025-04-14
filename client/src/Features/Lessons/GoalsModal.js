import React, { useState } from 'react';
import './Goals.css';

const GoalsModal = ({ show, onClose }) => {
  const [goal, setGoal] = useState('');

  const handleSetGoal = () => {
    if (goal.trim()) {
      alert(`Your goal "${goal}" has been saved.`);
      onClose();
    } else {
      alert('Please enter a valid goal.');
    }
  };

  if (!show) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Set Your Goal</h3>
        <input
          type="text"
          placeholder="Enter your goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="goal-input"
        />
        <div className="button-group">
          <button onClick={handleSetGoal} className="btn btn-success">
            Save Goal
          </button>
          <button onClick={onClose} className="btn btn-danger">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalsModal;
