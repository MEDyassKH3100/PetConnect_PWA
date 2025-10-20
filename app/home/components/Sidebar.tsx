'use client';

import React from 'react';
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
} from 'lucide-react';

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
                    {/* Pet Profile */}
                    <div className="border-t p-4">
                        <h3 className="mb-2 text-sm font-medium text-gray-500">
                            Mon Animal Actif
                        </h3>
                        <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                                    alt="Pet"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-medium text-gray-800">Max</p>
                                <p className="text-xs text-gray-500">Labrador • 3 ans</p>
                            </div>
                        </div>
                    </div>
                    {/* Urgent Reminders */}
                    <div className="border-t p-4">
                        <h3 className="mb-2 text-sm font-medium text-gray-500">
                            Rappels urgents
                        </h3>
                        <div className="rounded-lg bg-orange-50 p-3">
                            <div className="flex items-center space-x-2">
                                <BellIcon size={16} className="text-orange-500" />
                                <p className="text-sm text-orange-700">Vaccin Rage: 2 jours</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};