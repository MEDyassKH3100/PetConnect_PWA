'use client';

import React, { useEffect, useState } from 'react';
import {
    HeartPulseIcon,
    UtensilsIcon,
    GraduationCapIcon,
    HomeIcon,
    LayoutDashboardIcon,
    BellIcon,
    XIcon,
    MenuIcon,
    CalendarIcon,
    UserIcon,
    SettingsIcon,
    AlertTriangleIcon,
    ClockIcon,
} from 'lucide-react';

interface UrgentReminder {
    id: string;
    type: 'vaccination' | 'appointment';
    title: string;
    petName: string;
    date: string;
    daysUntil: number;
    urgencyLevel: 'critical' | 'warning' | 'info';
}

type SidebarProps = {
    activeModule: string;
    setActiveModule: (module: string) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

export const Sidebar = ({
    activeModule,
    setActiveModule,
    isOpen,
    setIsOpen,
}: SidebarProps) => {
    const [urgentReminders, setUrgentReminders] = useState<UrgentReminder[]>([]);
    const [loadingReminders, setLoadingReminders] = useState(true);
    const [showAllReminders, setShowAllReminders] = useState(false);
    const [maxVisibleReminders] = useState(3); // Nombre maximum de rappels visibles par défaut

    useEffect(() => {
        fetchUrgentReminders();
        // Rafraîchir toutes les 5 minutes
        const interval = setInterval(fetchUrgentReminders, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const fetchUrgentReminders = async () => {
        try {
            const response = await fetch('/api/health?action=urgent-reminders');
            const data = await response.json();
            if (data.reminders) {
                setUrgentReminders(data.reminders);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des rappels urgents:', error);
        } finally {
            setLoadingReminders(false);
        }
    };

    const formatReminderText = (reminder: UrgentReminder) => {
        // Raccourcir le titre pour les vaccins
        let shortTitle = reminder.title;
        if (reminder.type === 'vaccination' && reminder.title.startsWith('Vaccin ')) {
            shortTitle = reminder.title.replace('Vaccin ', '');
        }

        if (reminder.daysUntil === 0) {
            return `${shortTitle}: Aujourd'hui`;
        } else if (reminder.daysUntil === 1) {
            return `${shortTitle}: Demain`;
        } else if (reminder.daysUntil < -100) {
            return `${shortTitle}: À programmer`;
        } else if (reminder.daysUntil < 0) {
            return `${shortTitle}: En retard (${Math.abs(reminder.daysUntil)}j)`;
        } else {
            return `${shortTitle}: ${reminder.daysUntil}j`;
        }
    };

    const getReminderStyle = (urgencyLevel: string) => {
        switch (urgencyLevel) {
            case 'critical':
                return {
                    bg: 'bg-red-50',
                    text: 'text-red-700',
                    icon: 'text-red-500'
                };
            case 'warning':
                return {
                    bg: 'bg-orange-50',
                    text: 'text-orange-700',
                    icon: 'text-orange-500'
                };
            default:
                return {
                    bg: 'bg-blue-50',
                    text: 'text-blue-700',
                    icon: 'text-blue-500'
                };
        }
    };

    const getReminderIcon = (reminder: UrgentReminder) => {
        if (reminder.urgencyLevel === 'critical') {
            return <AlertTriangleIcon size={16} />;
        } else if (reminder.type === 'vaccination') {
            return <HeartPulseIcon size={16} />;
        } else {
            return <CalendarIcon size={16} />;
        }
    };
    const mainNavItems = [
        {
            id: 'dashboard',
            name: "Vue d'ensemble",
            icon: <LayoutDashboardIcon size={20} />,
        },
        {
            id: 'health',
            name: 'Santé',
            icon: <HeartPulseIcon size={20} />,
        },
        {
            id: 'nutrition',
            name: 'Nutrition',
            icon: <UtensilsIcon size={20} />,
        },
        {
            id: 'education',
            name: 'Éducation',
            icon: <GraduationCapIcon size={20} />,
        },
        {
            id: 'adoption',
            name: 'Adoption',
            icon: <HomeIcon size={20} />,
        },
    ];
    const userNavItems = [
        {
            id: 'pets',
            name: 'Mes Animaux',
            icon: <HeartPulseIcon size={20} />,
        },
        {
            id: 'appointments',
            name: 'Rendez-vous',
            icon: <CalendarIcon size={20} />,
        },
        {
            id: 'notifications',
            name: 'Notifications',
            icon: <BellIcon size={20} />,
        },
        {
            id: 'profile',
            name: 'Mon Profil',
            icon: <UserIcon size={20} />,
        },
        {
            id: 'settings',
            name: 'Paramètres',
            icon: <SettingsIcon size={20} />,
        },
    ];

    return (
        <>
            {/* Mobile sidebar backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex h-full flex-col">
                    {/* Logo and close button */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center space-x-2">
                            <div className="bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full p-1">
                                <HeartPulseIcon size={24} className="text-white" />
                            </div>
                            <h1 className="text-xl font-bold text-gray-800">PetConnect</h1>
                        </div>
                        <button
                            className="p-1 rounded-md hover:bg-gray-100 lg:hidden"
                            onClick={() => setIsOpen(false)}
                        >
                            <XIcon size={20} />
                        </button>
                    </div>
                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto p-4">
                        <div className="mb-6">
                            <h3 className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Modules
                            </h3>
                            <ul className="space-y-1">
                                {mainNavItems.map((item) => (
                                    <li key={item.id}>
                                        <button
                                            className={`flex w-full items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${activeModule === item.id ? 'bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                                            onClick={() => {
                                                setActiveModule(item.id);
                                                setIsOpen(false);
                                            }}
                                        >
                                            <span
                                                className={
                                                    activeModule === item.id
                                                        ? 'text-white'
                                                        : 'text-gray-500'
                                                }
                                            >
                                                {item.icon}
                                            </span>
                                            <span>{item.name}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Mon Compte
                            </h3>
                            <ul className="space-y-1">
                                {userNavItems.map((item) => (
                                    <li key={item.id}>
                                        <button
                                            className={`flex w-full items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${activeModule === item.id ? 'bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                                            onClick={() => {
                                                setActiveModule(item.id);
                                                setIsOpen(false);
                                            }}
                                        >
                                            <span
                                                className={
                                                    activeModule === item.id
                                                        ? 'text-white'
                                                        : 'text-gray-500'
                                                }
                                            >
                                                {item.icon}
                                            </span>
                                            <span>{item.name}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>

                    {/* Urgent Reminders */}
                    <div className="border-t p-4">
                        <h3 className="mb-2 text-sm font-medium text-gray-500">
                            Rappels urgents
                        </h3>
                        {loadingReminders ? (
                            <div className="flex items-center justify-center py-4">
                                <ClockIcon className="w-4 h-4 animate-spin text-gray-400 mr-2" />
                                <span className="text-xs text-gray-500">Chargement...</span>
                            </div>
                        ) : urgentReminders.length > 0 ? (
                            <div className="space-y-2">
                                {/* Container avec scroll si plus de 3 éléments */}
                                <div className={`space-y-2 ${urgentReminders.length > maxVisibleReminders && !showAllReminders
                                    ? 'max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-1'
                                    : ''
                                    }`}>
                                    {(showAllReminders ? urgentReminders : urgentReminders.slice(0, maxVisibleReminders)).map((reminder) => {
                                        const style = getReminderStyle(reminder.urgencyLevel);
                                        return (
                                            <div key={reminder.id} className={`rounded-lg ${style.bg} p-3 transition-all duration-200 hover:shadow-sm`}>
                                                <div className="flex items-center space-x-2">
                                                    <span className={style.icon}>
                                                        {getReminderIcon(reminder)}
                                                    </span>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-xs font-medium ${style.text} truncate`} title={`${reminder.title} - ${reminder.petName}`}>
                                                            {formatReminderText(reminder)}
                                                        </p>
                                                        <p className="text-xs text-gray-500 truncate" title={reminder.petName}>
                                                            {reminder.petName}
                                                        </p>
                                                        {reminder.urgencyLevel === 'critical' && (
                                                            <div className="flex items-center mt-1">
                                                                <div className="w-1 h-1 bg-red-500 rounded-full mr-1 animate-pulse"></div>
                                                                <span className="text-xs text-red-600 font-medium">Urgent</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Bouton "Voir plus" si il y a plus de rappels */}
                                {urgentReminders.length > maxVisibleReminders && (
                                    <button
                                        onClick={() => setShowAllReminders(!showAllReminders)}
                                        className="w-full mt-2 py-2 px-3 text-xs text-[#FFB8C2] hover:text-[#E6A4B4] font-medium border border-[#FFB8C2] hover:border-[#E6A4B4] rounded-lg transition-colors duration-200 hover:bg-[#FFB8C2] hover:bg-opacity-5"
                                    >
                                        {showAllReminders
                                            ? `Voir moins (${urgentReminders.length - maxVisibleReminders} masqués)`
                                            : `Voir plus (${urgentReminders.length - maxVisibleReminders} autres)`
                                        }
                                    </button>
                                )}

                                {/* Indicateur du nombre total */}
                                {urgentReminders.length > 1 && (
                                    <div className="text-center mt-2 pt-2 border-t border-gray-200">
                                        <p className="text-xs text-gray-500">
                                            {urgentReminders.length} rappel{urgentReminders.length > 1 ? 's' : ''}
                                            {urgentReminders.filter(r => r.type === 'vaccination').length > 0 && (
                                                <span className="ml-1 text-blue-600">
                                                    • {urgentReminders.filter(r => r.type === 'vaccination').length} vaccin{urgentReminders.filter(r => r.type === 'vaccination').length > 1 ? 's' : ''}
                                                </span>
                                            )}
                                            {urgentReminders.filter(r => r.urgencyLevel === 'critical').length > 0 && (
                                                <span className="ml-1 text-red-600 font-medium">
                                                    • {urgentReminders.filter(r => r.urgencyLevel === 'critical').length} urgent{urgentReminders.filter(r => r.urgencyLevel === 'critical').length > 1 ? 's' : ''}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-4">
                                <BellIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                                <p className="text-xs text-gray-500">Aucun rappel urgent</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
};