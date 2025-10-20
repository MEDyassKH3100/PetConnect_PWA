'use client';

import React from 'react';
import {
    UtensilsIcon,
    ScaleIcon,
    ChartLineIcon,
    ClipboardIcon,
} from 'lucide-react';
import { NutritionChart } from './components/NutritionChart';

export const NutritionModule = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Module Nutrition</h1>
            {/* Weight Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Évolution du poids
                </h2>
                <div className="h-64 w-full">
                    <NutritionChart />
                </div>
            </div>
            {/* Nutrition Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                        <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-3">
                            <ScaleIcon size={24} className="text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            Suivi du poids
                        </h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                        Enregistrez et suivez l'évolution du poids de votre animal
                    </p>
                    <button className="text-[#FFB8C2] font-medium hover:underline">
                        Ajouter une mesure
                    </button>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                        <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-3">
                            <UtensilsIcon size={24} className="text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            Calculateur de rations
                        </h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                        Calculez la quantité idéale de nourriture selon l'âge et l'activité
                    </p>
                    <button className="text-[#FFB8C2] font-medium hover:underline">
                        Calculer
                    </button>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                        <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-3">
                            <ClipboardIcon size={24} className="text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            Recommandations
                        </h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                        Recevez des conseils nutritionnels personnalisés
                    </p>
                    <button className="text-[#FFB8C2] font-medium hover:underline">
                        Consulter
                    </button>
                </div>
            </div>
            {/* Ration Calculator Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Calculateur de rations
                </h2>
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Poids actuel (kg)
                            </label>
                            <input
                                type="number"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                                placeholder="25.5"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Âge
                            </label>
                            <input
                                type="number"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                                placeholder="3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Niveau d'activité
                            </label>
                            <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]">
                                <option>Sédentaire</option>
                                <option>Modéré</option>
                                <option>Actif</option>
                                <option>Très actif</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Type d'alimentation
                            </label>
                            <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]">
                                <option>Croquettes sèches</option>
                                <option>Nourriture humide</option>
                                <option>Alimentation mixte</option>
                                <option>BARF / Raw feeding</option>
                            </select>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white px-4 py-2 rounded-lg hover:from-[#FFB8C2] hover:to-[#F5F5DC]"
                    >
                        Calculer la ration
                    </button>
                </form>
            </div>
            {/* Current Diet */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Régime alimentaire actuel
                </h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-3">
                        <div>
                            <p className="font-medium text-gray-800">
                                Royal Canin Medium Adult
                            </p>
                            <p className="text-sm text-gray-500">
                                Croquettes premium pour chiens adultes
                            </p>
                        </div>
                        <div className="text-xl font-semibold text-gray-800">300g/jour</div>
                    </div>
                    <div className="flex justify-between items-center border-b pb-3">
                        <div>
                            <p className="font-medium text-gray-800">Compléments oméga-3</p>
                            <p className="text-sm text-gray-500">Huile de poisson</p>
                        </div>
                        <div className="text-xl font-semibold text-gray-800">5ml/jour</div>
                    </div>
                    <div className="pt-2">
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Recommandation :</span> Ce régime est adapté pour maintenir le poids actuel et assurer une bonne santé du pelage.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};