'use client';

import React, { useState } from 'react';
import {
    BellIcon,
    CheckIcon,
    XIcon,
    AlertCircleIcon,
    CalendarIcon,
    HeartPulseIcon,
    MessageSquareIcon,
} from 'lucide-react';

export const UserNotifications = () => {
    const [notifications, setNotifications] = useState([
        {
            id: '1',
            title: 'Rappel de vaccin',
            message: 'Vaccin contre la rage dans 2 jours',
            time: 'Il y a 1 heure',
            read: false,
            type: 'reminder',
            icon: <AlertCircleIcon size={16} className="text-[#FFB8C2]" />,
            bgColor: 'bg-[#FFB8C2] bg-opacity-10',
        },
        {
            id: '2',
            title: 'Bilan de santé',
            message: 'Résultats disponibles du dernier bilan',
            time: 'Il y a 3 heures',
            read: false,
            type: 'health',
            icon: <HeartPulseIcon size={16} className="text-[#F5F5DC]" />,
            bgColor: 'bg-[#F5F5DC] bg-opacity-10',
        },
        {
            id: '3',
            title: 'Rendez-vous confirmé',
            message: 'Votre rendez-vous du 20 octobre à 14h30 est confirmé',
            time: 'Il y a 1 jour',
            read: true,
            type: 'appointment',
            icon: <CalendarIcon size={16} className="text-[#FFB8C2]" />,
            bgColor: 'bg-[#FFB8C2] bg-opacity-10',
        },
        {
            id: '4',
            title: 'Nouveau conseil',
            message: "Découvrez nos conseils pour l'éducation de votre chien",
            time: 'Il y a 2 jours',
            read: true,
            type: 'tip',
            icon: <MessageSquareIcon size={16} className="text-[#F5F5DC]" />,
            bgColor: 'bg-[#F5F5DC] bg-opacity-10',
        },
    ]);

    const markAsRead = (id: string) => {
        setNotifications(
            notifications.map((notif) =>
                notif.id === id
                    ? {
                        ...notif,
                        read: true,
                    }
                    : notif,
            ),
        );
    };

    const deleteNotification = (id: string) => {
        setNotifications(notifications.filter((notif) => notif.id !== id));
    };

    const markAllAsRead = () => {
        setNotifications(
            notifications.map((notif) => ({
                ...notif,
                read: true,
            })),
        );
    };

    const clearAll = () => {
        setNotifications([]);
    };

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
                <div className="flex space-x-3">
                    {unreadCount > 0 && (
                        <button
                            className="text-sm text-[#FFB8C2] hover:underline"
                            onClick={markAllAsRead}
                        >
                            Tout marquer comme lu
                        </button>
                    )}
                    {notifications.length > 0 && (
                        <button
                            className="text-sm text-red-500 hover:underline"
                            onClick={clearAll}
                        >
                            Tout effacer
                        </button>
                    )}
                </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {notifications.length === 0 ? (
                    <div className="text-center py-12">
                        <BellIcon size={48} className="mx-auto text-gray-300 mb-3" />
                        <p className="text-gray-500">Aucune notification</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] bg-opacity-5' : ''}`}
                            >
                                <div className="flex items-start">
                                    <div
                                        className={`flex-shrink-0 ${notification.bgColor} rounded-full p-2 mr-3`}
                                    >
                                        {notification.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between">
                                            <p
                                                className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-800'}`}
                                            >
                                                {notification.title}
                                            </p>
                                            <p className="text-xs text-gray-400 whitespace-nowrap ml-2">
                                                {notification.time}
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {notification.message}
                                        </p>
                                    </div>
                                    <div className="ml-3 flex space-x-1">
                                        {!notification.read && (
                                            <button
                                                className="p-1 rounded-full hover:bg-[#FFB8C2] hover:bg-opacity-10 text-[#FFB8C2]"
                                                onClick={() => markAsRead(notification.id)}
                                                title="Marquer comme lu"
                                            >
                                                <CheckIcon size={16} />
                                            </button>
                                        )}
                                        <button
                                            className="p-1 rounded-full hover:bg-red-100 text-red-500"
                                            onClick={() => deleteNotification(notification.id)}
                                            title="Supprimer"
                                        >
                                            <XIcon size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Préférences de notification
                </h2>
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
                <div className="mt-6">
                    <button className="bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white px-4 py-2 rounded-lg hover:from-[#FFB8C2] hover:to-[#F5F5DC]">
                        Enregistrer les préférences
                    </button>
                </div>
            </div>
        </div>
    );
};