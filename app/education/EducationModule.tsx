'use client';

import React from 'react';
import {
    GraduationCapIcon,
    BookOpenIcon,
    TrophyIcon,
    BrainIcon,
} from 'lucide-react';

export const EducationModule = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Module Éducation</h1>
            {/* Progress Overview */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Progression du dressage
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full border-8 border-[#FFB8C2] flex items-center justify-center mb-2 relative">
                            <div className="absolute inset-0 rounded-full border-8 border-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] border-r-transparent border-b-transparent rotate-45"></div>
                            <span className="text-xl font-bold text-gray-700">25%</span>
                        </div>
                        <span className="text-sm font-medium text-gray-600">
                            Obéissance de base
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full border-8 border-[#FFB8C2] flex items-center justify-center mb-2 relative">
                            <div className="absolute inset-0 rounded-full border-8 border-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] border-r-transparent border-b-transparent rotate-[215deg]"></div>
                            <span className="text-xl font-bold text-gray-700">60%</span>
                        </div>
                        <span className="text-sm font-medium text-gray-600">
                            Marche en laisse
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full border-8 border-[#FFB8C2] flex items-center justify-center mb-2 relative">
                            <div className="absolute inset-0 rounded-full border-8 border-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] border-r-transparent border-b-transparent rotate-[325deg]"></div>
                            <span className="text-xl font-bold text-gray-700">90%</span>
                        </div>
                        <span className="text-sm font-medium text-gray-600">Propreté</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full border-8 border-[#FFB8C2] flex items-center justify-center mb-2 relative">
                            <div className="absolute inset-0 rounded-full border-8 border-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] border-r-transparent border-b-transparent rotate-[110deg]"></div>
                            <span className="text-xl font-bold text-gray-700">30%</span>
                        </div>
                        <span className="text-sm font-medium text-gray-600">
                            Socialisation
                        </span>
                    </div>
                </div>
            </div>
            {/* Training Programs */}
            <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-3">
                    Programmes de dressage
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-4">
                            <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-3">
                                <GraduationCapIcon size={24} className="text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                Obéissance de base
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Commandes essentielles : assis, couché, reste, viens
                        </p>
                        <div className="flex justify-between items-center">
                            <div className="w-2/3 bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] h-2 rounded-full"
                                    style={{
                                        width: '25%',
                                    }}
                                ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-600">
                                2/8 leçons
                            </span>
                        </div>
                        <button className="mt-4 text-[#FFB8C2] font-medium hover:underline">
                            Continuer
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-4">
                            <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-3">
                                <BookOpenIcon size={24} className="text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                Marche en laisse
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Techniques pour une marche sans tirer et avec attention
                        </p>
                        <div className="flex justify-between items-center">
                            <div className="w-2/3 bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] h-2 rounded-full"
                                    style={{
                                        width: '60%',
                                    }}
                                ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-600">
                                3/5 leçons
                            </span>
                        </div>
                        <button className="mt-4 text-[#FFB8C2] font-medium hover:underline">
                            Continuer
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center mb-4">
                            <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-3">
                                <TrophyIcon size={24} className="text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                Tricks avancés
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Tours et astuces pour stimuler mentalement votre animal
                        </p>
                        <div className="flex justify-between items-center">
                            <div className="w-2/3 bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] h-2 rounded-full"
                                    style={{
                                        width: '0%',
                                    }}
                                ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-600">
                                0/6 leçons
                            </span>
                        </div>
                        <button className="mt-4 text-[#FFB8C2] font-medium hover:underline">
                            Commencer
                        </button>
                    </div>
                </div>
            </div>
            {/* Behavioral Advice */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Conseils comportementaux
                </h2>
                <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] bg-opacity-10 rounded-lg">
                        <div className="flex items-start">
                            <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-3">
                                <BrainIcon size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800">
                                    Aboiements excessifs
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Les aboiements peuvent être causés par l'ennui ou l'anxiété.
                                    Essayez d'augmenter l'exercice quotidien et offrez des jouets
                                    d'enrichissement mental.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] bg-opacity-10 rounded-lg">
                        <div className="flex items-start">
                            <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-3">
                                <BrainIcon size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800">
                                    Anxiété de séparation
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Pratiquez des départs courts et progressifs. Ne faites pas de
                                    grands adieux ou retours émotionnels. Laissez un vêtement avec
                                    votre odeur.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] bg-opacity-10 rounded-lg">
                        <div className="flex items-start">
                            <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-3">
                                <BrainIcon size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800">
                                    Mâchonnement d'objets
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Fournissez des alternatives appropriées comme des jouets à
                                    mâcher. Utilisez des répulsifs sur les objets interdits et
                                    récompensez quand il utilise ses propres jouets.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="mt-4 text-[#FFB8C2] font-medium hover:underline">
                    Consulter plus de conseils
                </button>
            </div>
            {/* Training Schedule */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Calendrier d'entraînement
                </h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Jour
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Exercice
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Durée
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Statut
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    Lundi
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    Rappel et assis-reste
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    15 minutes
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                        Complété
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    Mercredi
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    Marche en laisse
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    20 minutes
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                                        Aujourd'hui
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    Vendredi
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    Socialisation au parc
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    30 minutes
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                        À venir
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};