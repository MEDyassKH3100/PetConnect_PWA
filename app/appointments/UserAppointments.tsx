'use client';

import React, { useState } from 'react';
import {
    CalendarIcon,
    PlusIcon,
    ClockIcon,
    MapPinIcon,
    UserIcon,
    XIcon,
} from 'lucide-react';
import { AppointmentCard } from './components/AppointmentCard';

export const UserAppointments = () => {
    const [showAddAppointment, setShowAddAppointment] = useState(false);

    const upcomingAppointments = [
        {
            id: '1',
            title: 'Vaccination rage',
            type: 'Vaccination',
            pet: 'Max',
            date: '20 octobre 2023',
            time: '14:30',
            doctor: 'Dr. Martin',
            location: 'Clinique Vétérinaire du Centre',
            address: '123 Rue de la Santé, 75001 Paris',
            status: 'upcoming',
            notes: 'Apporter le carnet de vaccination',
        },
        {
            id: '2',
            title: 'Bilan annuel',
            type: 'Consultation',
            pet: 'Mia',
            date: '15 novembre 2023',
            time: '10:00',
            doctor: 'Dr. Dupont',
            location: 'Cabinet Vétérinaire Saint Michel',
            address: '45 Avenue des Animaux, 75005 Paris',
            status: 'upcoming',
            notes: '',
        },
    ];

    const pastAppointments = [
        {
            id: '3',
            title: 'Consultation générale',
            type: 'Consultation',
            pet: 'Max',
            date: '15 septembre 2023',
            time: '09:15',
            doctor: 'Dr. Martin',
            location: 'Clinique Vétérinaire du Centre',
            address: '123 Rue de la Santé, 75001 Paris',
            status: 'completed',
            notes: 'Bilan général excellent. Légère sensibilité dentaire à surveiller.',
        },
        {
            id: '4',
            title: 'Vaccination CHPL',
            type: 'Vaccination',
            pet: 'Max',
            date: '20 août 2023',
            time: '16:00',
            doctor: 'Dr. Dupont',
            location: 'Cabinet Vétérinaire Saint Michel',
            address: '45 Avenue des Animaux, 75005 Paris',
            status: 'completed',
            notes: 'Vaccination CHPL effectuée. Aucune réaction.',
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Mes Rendez-vous</h1>
                <button
                    className="flex items-center space-x-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white px-3 py-2 rounded-lg hover:from-[#FFB8C2] hover:to-[#F5F5DC]"
                    onClick={() => setShowAddAppointment(true)}
                >
                    <PlusIcon size={16} />
                    <span>Nouveau rendez-vous</span>
                </button>
            </div>
            {showAddAppointment && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Planifier un nouveau rendez-vous
                        </h2>
                        <button
                            className="p-1 rounded-full hover:bg-gray-100"
                            onClick={() => setShowAddAppointment(false)}
                        >
                            <XIcon size={20} className="text-gray-500" />
                        </button>
                    </div>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Type de rendez-vous
                                </label>
                                <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]">
                                    <option value="">Sélectionnez un type</option>
                                    <option value="consultation">Consultation générale</option>
                                    <option value="vaccination">Vaccination</option>
                                    <option value="surgery">Chirurgie</option>
                                    <option value="grooming">Toilettage</option>
                                    <option value="dental">Soins dentaires</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Animal
                                </label>
                                <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]">
                                    <option value="">Sélectionnez un animal</option>
                                    <option value="max">Max</option>
                                    <option value="mia">Mia</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Heure
                                </label>
                                <input
                                    type="time"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Vétérinaire
                                </label>
                                <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]">
                                    <option value="">Sélectionnez un vétérinaire</option>
                                    <option value="dr-martin">Dr. Martin</option>
                                    <option value="dr-dupont">Dr. Dupont</option>
                                    <option value="dr-petit">Dr. Petit</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Clinique
                                </label>
                                <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]">
                                    <option value="">Sélectionnez une clinique</option>
                                    <option value="clinic-center">Clinique Vétérinaire du Centre</option>
                                    <option value="cabinet-saint-michel">Cabinet Vétérinaire Saint Michel</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Notes
                            </label>
                            <textarea
                                rows={3}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                                placeholder="Informations supplémentaires pour le vétérinaire..."
                            ></textarea>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                onClick={() => setShowAddAppointment(false)}
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white rounded-md hover:from-[#FFB8C2] hover:to-[#F5F5DC]"
                            >
                                Planifier
                            </button>
                        </div>
                    </form>
                </div>
            )}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Prochains rendez-vous
                </h2>
                {upcomingAppointments.length === 0 ? (
                    <div className="text-center py-8">
                        <CalendarIcon size={48} className="mx-auto text-gray-300 mb-3" />
                        <p className="text-gray-500">Aucun rendez-vous à venir</p>
                        <button
                            className="mt-3 text-sm text-[#FFB8C2] hover:underline"
                            onClick={() => setShowAddAppointment(true)}
                        >
                            Planifier un rendez-vous
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {upcomingAppointments.map((appointment) => (
                            <AppointmentCard key={appointment.id} appointment={appointment} />
                        ))}
                    </div>
                )}
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Historique des rendez-vous
                </h2>
                {pastAppointments.length === 0 ? (
                    <div className="text-center py-8">
                        <CalendarIcon size={48} className="mx-auto text-gray-300 mb-3" />
                        <p className="text-gray-500">Aucun rendez-vous passé</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {pastAppointments.map((appointment) => (
                            <AppointmentCard key={appointment.id} appointment={appointment} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};