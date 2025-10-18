'use client';

import React, { useState } from 'react';
import {
    BellIcon,
    GlobeIcon,
    ShieldIcon,
    EyeIcon,
    MoonIcon,
    SaveIcon,
} from 'lucide-react';

export const UserSettings = () => {
    const [language, setLanguage] = useState('fr');
    const [theme, setTheme] = useState('light');

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Paramètres</h1>
            {/* General Settings */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                    <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-3">
                        <GlobeIcon size={20} className="text-white" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Paramètres généraux
                    </h2>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Langue
                        </label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                        >
                            <option value="fr">Français</option>
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            <option value="de">Deutsch</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Thème
                        </label>
                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="theme"
                                    value="light"
                                    checked={theme === 'light'}
                                    onChange={() => setTheme('light')}
                                    className="mr-2"
                                />
                                <span>Clair</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="theme"
                                    value="dark"
                                    checked={theme === 'dark'}
                                    onChange={() => setTheme('dark')}
                                    className="mr-2"
                                />
                                <span>Sombre</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="theme"
                                    value="system"
                                    checked={theme === 'system'}
                                    onChange={() => setTheme('system')}
                                    className="mr-2"
                                />
                                <span>Système</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-gray-800">Mode compact</h3>
                            <p className="text-sm text-gray-500">
                                Afficher plus d'informations à l'écran
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FFB8C2] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#F5F5DC] peer-checked:to-[#FFB8C2]"></div>
                        </label>
                    </div>
                </div>
            </div>
            {/* Notification Settings */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                    <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-3">
                        <BellIcon size={20} className="text-white" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-gray-800">
                                Rappels de vaccination
                            </h3>
                            <p className="text-sm text-gray-500">
                                Notifications pour les vaccins à venir
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                                defaultChecked
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FFB8C2] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#F5F5DC] peer-checked:to-[#FFB8C2]"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-gray-800">
                                Rappels de rendez-vous
                            </h3>
                            <p className="text-sm text-gray-500">
                                Notifications pour les rendez-vous vétérinaires
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                                defaultChecked
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FFB8C2] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#F5F5DC] peer-checked:to-[#FFB8C2]"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-gray-800">Conseils quotidiens</h3>
                            <p className="text-sm text-gray-500">
                                Conseils et astuces pour le bien-être de votre animal
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FFB8C2] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#F5F5DC] peer-checked:to-[#FFB8C2]"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-gray-800">
                                Mises à jour de l'application
                            </h3>
                            <p className="text-sm text-gray-500">
                                Notifications pour les nouvelles fonctionnalités
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                                defaultChecked
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FFB8C2] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#F5F5DC] peer-checked:to-[#FFB8C2]"></div>
                        </label>
                    </div>
                </div>
            </div>
            {/* Privacy Settings */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                    <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-3">
                        <ShieldIcon size={20} className="text-white" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Confidentialité
                    </h2>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-gray-800">Partage de données</h3>
                            <p className="text-sm text-gray-500">
                                Autoriser le partage anonyme des données pour améliorer nos
                                services
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                                defaultChecked
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FFB8C2] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#F5F5DC] peer-checked:to-[#FFB8C2]"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-gray-800">Profil public</h3>
                            <p className="text-sm text-gray-500">
                                Rendre votre profil visible pour les autres utilisateurs
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FFB8C2] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#F5F5DC] peer-checked:to-[#FFB8C2]"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-gray-800">Cookies</h3>
                            <p className="text-sm text-gray-500">
                                Autoriser l'utilisation de cookies pour personnaliser votre
                                expérience
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                                defaultChecked
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FFB8C2] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#F5F5DC] peer-checked:to-[#FFB8C2]"></div>
                        </label>
                    </div>
                </div>
            </div>
            {/* Data Management */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                    <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-3">
                        <EyeIcon size={20} className="text-white" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Données personnelles
                    </h2>
                </div>
                <div className="space-y-4">
                    <div>
                        <button className="text-[#FFB8C2] font-medium hover:underline">
                            Télécharger mes données
                        </button>
                        <p className="text-sm text-gray-500 mt-1">
                            Téléchargez toutes vos informations personnelles et celles de vos
                            animaux
                        </p>
                    </div>
                    <div>
                        <button className="text-red-500 font-medium hover:underline">
                            Supprimer mon compte
                        </button>
                        <p className="text-sm text-gray-500 mt-1">
                            Cette action est irréversible et supprimera définitivement votre
                            compte et toutes vos données
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <button className="flex items-center space-x-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white px-4 py-2 rounded-lg hover:from-[#FFB8C2] hover:to-[#F5F5DC]">
                    <SaveIcon size={16} />
                    <span>Enregistrer tous les paramètres</span>
                </button>
            </div>
        </div>
    );
};