'use client';

import React from 'react';
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  EditIcon,
  Trash2Icon,
  CheckIcon,
  XIcon,
} from 'lucide-react';
import { Appointment } from '@/types/Appointement';

type AppointmentProps = {
  appointment: Appointment;
  onDelete?: (id?: string) => void;
  onEdit?: (appointment: Appointment) => void;
};

export const AppointmentCard = ({ appointment, onDelete, onEdit }: AppointmentProps) => {
  const isPast = appointment.status === 'completed' || appointment.status === 'cancelled';

  return (
    <div className={`bg-white rounded-lg border ${isPast ? 'border-gray-200' : 'border-[#FFB8C2]'} overflow-hidden`}>
      <div className="flex flex-col sm:flex-row">
        <div className={`sm:w-2 ${isPast ? 'bg-gray-200' : 'bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2]'}`}></div>
        <div className="p-4 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-gray-800">{appointment.title || 'Rendez-vous'}</h3>
              <p className="text-sm text-gray-500">
                {appointment.type} • {appointment.pet}
              </p>
            </div>
            <div className="mt-2 sm:mt-0">
              {appointment.status === 'completed' ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <CheckIcon size={12} className="mr-1" />
                  Terminé
                </span>
              ) : appointment.status === 'cancelled' ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  <XIcon size={12} className="mr-1" />
                  Annulé
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FFB8C2] text-white">
                  À venir
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
            <div className="flex items-center text-sm text-gray-600">
              <CalendarIcon size={16} className="mr-2 text-gray-400 flex-shrink-0" />
              <span>{appointment.date}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <ClockIcon size={16} className="mr-2 text-gray-400 flex-shrink-0" />
              <span>{appointment.time}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <UserIcon size={16} className="mr-2 text-gray-400 flex-shrink-0" />
              <span>{appointment.doctor}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPinIcon size={16} className="mr-2 text-gray-400 flex-shrink-0" />
              <span>{appointment.location || appointment.clinic || '—'}</span>
            </div>
          </div>

          {appointment.notes && (
            <div className="mb-3">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Notes: </span>
                {appointment.notes}
              </p>
            </div>
          )}

          {!isPast && (
            <div className="flex justify-end space-x-2 mt-2">
              {onEdit && (
                <button
                  className="flex items-center space-x-1 text-sm text-[#FFB8C2] hover:underline"
                  onClick={() => onEdit(appointment)}
                >
                  <EditIcon size={14} />
                  <span>Modifier</span>
                </button>
              )}
              {onDelete && (
                <button
                  className="flex items-center space-x-1 text-sm text-red-500 hover:underline"
                  onClick={() => onDelete(appointment.id || appointment._id)}
                >
                  <Trash2Icon size={14} />
                  <span>Annuler</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
