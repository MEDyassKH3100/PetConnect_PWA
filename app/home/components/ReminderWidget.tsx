'use client';

import React from 'react';
import { CalendarIcon, AlertCircleIcon } from 'lucide-react';

export const ReminderWidget = () => {
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
                <div className="flex items-center p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                    <div className="mr-3">
                        <AlertCircleIcon size={20} className="text-orange-500" />
                    </div>
                    <div className="flex-1">
                        <p className="font-medium text-gray-800">Vaccin contre la rage</p>
                        <p className="text-sm text-gray-500">
                            18 octobre 2023 - Dans 2 jours
                        </p>
                    </div>
                    <button className="text-sm text-[#FFB8C2] hover:underline">
                        Détails
                    </button>
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <div className="mr-3">
                        <CalendarIcon size={20} className="text-blue-500" />
                    </div>
                    <div className="flex-1">
                        <p className="font-medium text-gray-800">Rendez-vous vétérinaire</p>
                        <p className="text-sm text-gray-500">
                            15 novembre 2023 - Dans 28 jours
                        </p>
                    </div>
                    <button className="text-sm text-[#FFB8C2] hover:underline">
                        Détails
                    </button>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <div className="mr-3">
                        <CalendarIcon size={20} className="text-green-500" />
                    </div>
                    <div className="flex-1">
                        <p className="font-medium text-gray-800">Vermifuge</p>
                        <p className="text-sm text-gray-500">
                            30 octobre 2023 - Dans 14 jours
                        </p>
                    </div>
                    <button className="text-sm text-[#FFB8C2] hover:underline">
                        Détails
                    </button>
                </div>
            </div>
            <button className="mt-4 text-sm text-[#FFB8C2] hover:underline">
                Voir tous les rappels
            </button>
        </div>
    );
};