'use client';
import React, { useEffect, useState } from 'react';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface WeightLog {
  date: string;
  weight: number;
}

interface NutritionChartProps {
  petId: string;
  token: string;
}

export const NutritionChart = ({ petId, token }: NutritionChartProps) => {
  const [weights, setWeights] = useState<WeightLog[]>([]);

  useEffect(() => {
    const fetchWeights = async () => {
      const res = await fetch(`/api/pets/${petId}/weights`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setWeights(data.weights);
    };
    fetchWeights();
  }, [petId, token]);

  const labels = weights.map((w) => new Date(w.date).toLocaleDateString());
  const data = {
    labels,
    datasets: [
      {
        label: 'Poids (kg)',
        data: weights.map((w) => w.weight),
        borderColor: '#FFB8C2',
        backgroundColor: 'rgba(245, 245, 220, 0.4)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' as const } },
    scales: {
      y: { beginAtZero: false },
    },
  };

  return <Line data={data} options={options} />;
};
