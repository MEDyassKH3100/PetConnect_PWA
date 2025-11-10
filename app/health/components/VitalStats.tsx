'use client';

import React from 'react';
import { VitalStats } from '@/types/health';
import { ActivityIcon, ThermometerIcon, HeartIcon } from 'lucide-react';

interface VitalStatsCardProps {
  stats: VitalStats;
}

export const VitalStatsCard = ({ stats }: VitalStatsCardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-2">
          <ActivityIcon className="text-blue-500" size={20} />
          <h3 className="text-sm font-medium text-gray-700">Poids</h3>
        </div>
        <p className="text-2xl font-semibold text-gray-900">{stats.weight} kg</p>
        <p className="text-xs text-gray-500 mt-1">
          Dernière mesure: {stats.lastWeightDate}
        </p>
      </div>
      
      {stats.temperature && (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-2">
            <ThermometerIcon className="text-red-500" size={20} />
            <h3 className="text-sm font-medium text-gray-700">Température</h3>
          </div>
          <p className="text-2xl font-semibold text-gray-900">
            {stats.temperature}°C
          </p>
        </div>
      )}
      
      {stats.heartRate && (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-2">
            <HeartIcon className="text-red-500" size={20} />
            <h3 className="text-sm font-medium text-gray-700">Rythme cardiaque</h3>
          </div>
          <p className="text-2xl font-semibold text-gray-900">
            {stats.heartRate} BPM
          </p>
        </div>
      )}
    </div>
  );
};