'use client';

import React from 'react';
import { Vaccination } from '@/types/health';
import { CheckCircleIcon, AlertCircleIcon, ClockIcon } from 'lucide-react';

interface VaccinationTrackerProps {
  vaccinations: Vaccination[];
}

export const VaccinationTracker = ({ vaccinations }: VaccinationTrackerProps) => {
  const getStatusIcon = (status: Vaccination['status']) => {
    switch (status) {
      case 'up-to-date':
        return <CheckCircleIcon className="text-green-500" size={20} />;
      case 'due-soon':
        return <ClockIcon className="text-orange-500" size={20} />;
      case 'overdue':
        return <AlertCircleIcon className="text-red-500" size={20} />;
    }
  };

  return (
    <div className="space-y-4">
      {vaccinations.map((vaccination) => (
        <div
          key={vaccination.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
        >
          <div className="flex items-center space-x-4">
            {getStatusIcon(vaccination.status)}
            <div>
              <h3 className="font-medium text-gray-900">{vaccination.name}</h3>
              <p className="text-sm text-gray-500">
                Dernière dose: {vaccination.date}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              Prochaine dose
            </p>
            <p className="text-sm text-gray-500">{vaccination.nextDueDate}</p>
          </div>
        </div>
      ))}
    </div>
  );
};