'use client';

import React, { useEffect, useState } from 'react';
import { CalendarIcon, AlertCircleIcon, ClockIcon } from 'lucide-react';
import { Appointment } from '@/types/Appointement';

export const ReminderWidget = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUpcomingAppointments();
    }, []);

    const fetchUpcomingAppointments = async () => {
        try {
            const response = await fetch('/api/appointments');
            const data = await response.json();

            // Filtrer les rendez-vous à venir et les trier par date
            const upcomingAppointments = data
                .filter((apt: Appointment) => apt.status === 'upcoming')
                .sort((a: Appointment, b: Appointment) => {
                    const dateA = new Date(`${a.date} ${a.time}`);
                    const dateB = new Date(`${b.date} ${b.time}`);
                    return dateA.getTime() - dateB.getTime();
                })
                .slice(0, 3); // Limiter à 3 rendez-vous

            setAppointments(upcomingAppointments);
        } catch (error) {
            console.error('Erreur lors du chargement des rendez-vous:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr: string, timeStr: string) => {
        const appointmentDate = new Date(`${dateStr} ${timeStr}`);
        const now = new Date();
        const diffTime = appointmentDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        const formattedDate = appointmentDate.toLocaleDateString('fr-FR', options);

        if (diffDays === 0) {
            return `${formattedDate} - Aujourd'hui`;
        } else if (diffDays === 1) {
            return `${formattedDate} - Demain`;
        } else if (diffDays > 0) {
            return `${formattedDate} - Dans ${diffDays} jours`;
        } else {
            return `${formattedDate} - Passé`;
        }
    };

    const getAppointmentColor = (dateStr: string, timeStr: string) => {
        const appointmentDate = new Date(`${dateStr} ${timeStr}`);
        const now = new Date();
        const diffTime = appointmentDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 1) {
            return {
                bg: 'bg-red-50',
                border: 'border-red-500',
                icon: 'text-red-500'
            };
        } else if (diffDays <= 7) {
            return {
                bg: 'bg-orange-50',
                border: 'border-orange-500',
                icon: 'text-orange-500'
            };
        } else {
            return {
                bg: 'bg-blue-50',
                border: 'border-blue-500',
                icon: 'text-blue-500'
            };
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
                <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-3">
                    <CalendarIcon size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                    Prochains rappels
                </h3>
            </div>
            <div className="space-y-3">
                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <ClockIcon className="w-6 h-6 animate-spin text-[#FFB8C2] mr-2" />
                        <span className="text-gray-600">Chargement...</span>
                    </div>
                ) : appointments.length > 0 ? (
                    appointments.map((appointment) => {
                        const colors = getAppointmentColor(appointment.date, appointment.time);
                        return (
                            <div key={appointment._id || appointment.id} className={`flex items-center p-3 ${colors.bg} rounded-lg border-l-4 ${colors.border}`}>
                                <div className="mr-3">
                                    <CalendarIcon size={20} className={colors.icon} />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">
                                        {appointment.title || appointment.type}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {appointment.pet && `${appointment.pet} • `}
                                        {formatDate(appointment.date, appointment.time)}
                                    </p>
                                    {appointment.doctor && (
                                        <p className="text-xs text-gray-500">
                                            Dr. {appointment.doctor}
                                        </p>
                                    )}
                                </div>
                                <button className="text-sm text-[#FFB8C2] hover:underline">
                                    Détails
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-8">
                        <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-gray-500 mb-2">Aucun rendez-vous à venir</p>
                        <p className="text-sm text-gray-400">Planifiez votre prochain rendez-vous</p>
                    </div>
                )}
            </div>
            <button className="mt-4 text-sm text-[#FFB8C2] hover:underline">
                Voir tous les rappels
            </button>
        </div>
    );
};