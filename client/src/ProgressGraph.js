import { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProgressGraph = ({ progressData, remarks }) => {
  const chartRef = useRef(null);

  const data = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [
      {
        label: 'Progress',
        data: progressData,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    // Destroy previous chart if it exists
    if (chartRef.current) {
      chartRef.current.chart.destroy();
    }
  }, [progressData]); // Re-render when progressData changes

  return (
    <div className="progress-graph-container">
      <h4>Your Progress</h4>
      <Bar ref={chartRef} data={data} options={options} />
      <p>{remarks}</p>
    </div>
  );
};

export default ProgressGraph;
