import React from 'react';
import { Bar } from 'react-chartjs-2';

const ProgressBar = ({ progress }) => {
    const data = {
        labels: ['Progress'],
        datasets: [
            {
                label: 'Lesson Completion',
                data: [progress],
                backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)'],
                borderWidth: 1,
            },
        ],
    };

    return <Bar data={data} />;
};

export default ProgressBar;
