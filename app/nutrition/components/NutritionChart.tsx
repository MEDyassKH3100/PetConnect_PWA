'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Enregistrement des composants Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

export const NutritionChart = () => {
    const data = {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'],
        datasets: [
            {
                label: 'Poids (kg)',
                data: [24.2, 24.5, 25.1, 25.3, 25.5, 25.4, 25.5],
                borderColor: '#FFB8C2', // Couleur rose pour matcher votre palette
                backgroundColor: 'rgba(245, 245, 220, 0.5)', // Beige clair avec transparence
                tension: 0.3,
            },
            {
                label: 'Poids idéal',
                data: [24.8, 24.8, 24.8, 24.8, 24.8, 24.8, 24.8],
                borderColor: '#F5F5DC', // Beige pour la ligne idéale
                backgroundColor: 'rgba(255, 184, 194, 0.5)', // Rose avec transparence
                borderDash: [5, 5],
                tension: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
            },
        },
        scales: {
            y: {
                min: 23,
                max: 27,
            },
        },
    };

    return <Line data={data} options={options} />;
};