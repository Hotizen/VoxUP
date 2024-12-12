import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; 
import { Bar } from 'react-chartjs-2';
import './ProgressCard.css'; // Ensure you have the CSS for styling

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProgressCard = ({ progressData }) => {
  const chartRef = useRef(null); // Use ref to reference the canvas element
  const [currentProgress, setCurrentProgress] = useState(progressData); // Store progress in state

  // Update chart if progressData changes
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy previous chart instance
    }
  }, [progressData]);

  const data = {
    labels: currentProgress.labels,  // ['Python Basics', 'React Basics', 'JavaScript Essentials']
    datasets: [
      {
        label: 'Completion Percentage',
        data: currentProgress.values, // [80, 60, 30]
        backgroundColor: '#4caf50', // Color for the bars
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Lessons', // X-axis label
        },
      },
      y: {
        beginAtZero: true, // Ensure the y-axis starts from 0
        max: 100, // Max value for progress is 100%
        title: {
          display: true,
          text: 'Progress (%)', // Y-axis label
        },
      },
    },
  };

  // Function to update progress dynamically (for demo purposes)
  const updateProgress = () => {
    // Example of updating progress: Increase progress for Python Basics
    setCurrentProgress({
      ...currentProgress,
      values: currentProgress.values.map((value, index) =>
        index === 0 ? value + 10 : value // Increase the first value (Python Basics)
      ),
    });
  };

};

export default ProgressCard;
