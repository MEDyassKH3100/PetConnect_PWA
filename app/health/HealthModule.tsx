'use client';

import React from 'react';
import {
    CalendarIcon,
    ClipboardListIcon,
    ActivityIcon,
    PlusIcon,
    BrainIcon,
} from 'lucide-react';

export const HealthModule = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Module Santé</h1>
                <button className="flex items-center space-x-1 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white px-3 py-2 rounded-lg hover:from-[#FFB8C2] hover:to-[#F5F5DC]">
                    <PlusIcon size={16} />
                    <span>Ajouter</span>
                </button>
            </div>
            {/* Health Module Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                        <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-3">
                            <ClipboardListIcon size={24} className="text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            Carnet de santé
                        </h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                        Accédez au carnet de santé numérique de votre animal
                    </p>
                    <button className="text-[#FFB8C2] font-medium hover:underline">
                        Consulter
                    </button>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                        <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-3">
                            <CalendarIcon size={24} className="text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Rappels</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                        Gérez les rappels de vaccins et rendez-vous vétérinaires
                    </p>
                    <button className="text-[#FFB8C2] font-medium hover:underline">
                        Gérer
                    </button>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                        <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-3">
                            <ActivityIcon size={24} className="text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            Historique médical
                        </h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                        Consultez l'historique complet des soins médicaux
                    </p>
                    <button className="text-[#FFB8C2] font-medium hover:underline">
                        Consulter
                    </button>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                        <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-3">
                            <BrainIcon size={24} className="text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            Assistant diagnostic
                        </h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                        Utilisez l'IA pour une première évaluation des symptômes
                    </p>
                    <button className="text-[#FFB8C2] font-medium hover:underline">
                        Démarrer
                    </button>
                </div>
            </div>
            {/* Upcoming appointments */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Prochains rendez-vous
                </h2>
                <div className="space-y-4">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-4">
                            <CalendarIcon size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-gray-800">Vaccination rage</p>
                            <p className="text-sm text-gray-500">20 octobre 2023 - 14:30</p>
                        </div>
                        <div className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-1 rounded">
                            Dans 2 jours
                        </div>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-4">
                            <CalendarIcon size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-gray-800">Bilan annuel</p>
                            <p className="text-sm text-gray-500">15 novembre 2023 - 10:00</p>
                        </div>
                        <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">
                            Dans 28 jours
                        </div>
                    </div>
                </div>
            </div>
            {/* Health Records */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Dossier médical récent
                </h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Praticien
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Notes
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    15/09/2023
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    Consultation générale
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    Dr. Martin
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    Bilan général excellent. Légère sensibilité dentaire à surveiller.
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    20/08/2023
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    Vaccination
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    Dr. Dupont
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    Vaccination CHPL effectuée. Aucune réaction.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};