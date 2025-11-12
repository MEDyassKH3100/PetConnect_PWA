'use client';

import React from 'react';
import { MedicalAppointment } from '@/types/health';
import { CalendarIcon } from 'lucide-react';

interface AppointmentListProps {
  appointments: MedicalAppointment[];
  onDelete?: (id: string) => void;
}

export const AppointmentList = ({ appointments, onDelete }: AppointmentListProps) => {
  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="flex items-center p-3 bg-gray-50 rounded-lg"
        >
          <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-4">
            <CalendarIcon size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-800">{appointment.type}</p>
            <p className="text-sm text-gray-600">
              {appointment.date} à {appointment.time} - Dr. {appointment.practitioner}
            </p>
            {appointment.notes && (
              <p className="text-sm text-gray-500 mt-1">{appointment.notes}</p>
            )}
          </div>
          {typeof onDelete === 'function' && (
            <div className="ml-4">
              <button
                type="button"
                onClick={() => onDelete(appointment.id)}
                className="px-2 py-1 text-sm text-red-600 hover:underline"
                aria-label={`Supprimer rendez-vous ${appointment.id}`}
              >
                Supprimer
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};