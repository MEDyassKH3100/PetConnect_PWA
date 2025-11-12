'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    SearchIcon,
    BellIcon,
    MessageSquareIcon,
    MenuIcon,
    UserIcon,
    HeartPulseIcon,
    SettingsIcon,
    LogOutIcon,
    LockIcon,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/slices/hooks';
import { fetchUserProfile, logout } from '@/store/slices/authSlice';

type HeaderProps = {
    toggleSidebarAction: () => void;
    setActiveModuleAction: (module: string) => void;
};

export const Header = ({ toggleSidebarAction: toggleSidebar,
    setActiveModuleAction: setActiveModule }: HeaderProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    useEffect(() => {
        // Récupérer le profil utilisateur si authentifié
        if (isAuthenticated && !user) {
            dispatch(fetchUserProfile());
        }
    }, [isAuthenticated, user, dispatch]);


    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between px-4 py-3">
                {/* Menu button - mobile only */}
                <button
                    className="p-1 rounded-md hover:bg-gray-100 lg:hidden"
                    onClick={toggleSidebar}
                >
                    <MenuIcon size={24} />
                </button>
                {/* Logo/Home Link */}
                <div className="text-lg font-bold text-gray-800 hidden md:block">
                    PetConnect
                </div>
                {/* Search */}
                <div className="hidden md:flex items-center flex-1 max-w-md ml-4">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <SearchIcon size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFB8C2] focus:bg-white"
                        />
                    </div>
                </div>
                {/* Right side icons */}
                <div className="flex items-center space-x-4">
                    {/* AI Assistant */}
                    <button className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full text-white hover:from-[#FFB8C2] hover:to-[#F5F5DC]">
                        <MessageSquareIcon size={20} />
                    </button>
                    {/* Notifications */}
                    <div className="relative">
                        <button
                            className="p-1 rounded-md hover:bg-gray-100 relative"
                            onClick={() => {
                                setShowNotifications(!showNotifications);
                                setShowUserMenu(false);
                            }}
                        >
                            <BellIcon size={20} />
                            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-orange-500"></span>
                        </button>
                        {/* Notification dropdown */}
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                <div className="p-3 border-b flex justify-between items-center">
                                    <h3 className="font-medium">Notifications</h3>
                                    <button
                                        className="text-sm text-[#FFB8C2] hover:underline"
                                        onClick={() => setActiveModule('notifications')}
                                    >
                                        Voir tout
                                    </button>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    <div className="p-3 border-b hover:bg-gray-50">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 bg-orange-100 rounded-full p-2">
                                                <BellIcon size={16} className="text-orange-500" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-800">
                                                    Rappel de vaccin
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Vaccin contre la rage dans 2 jours
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Il y a 1 heure
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-3 hover:bg-gray-50">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
                                                <HeartPulseIcon size={16} className="text-green-500" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-800">
                                                    Bilan de santé
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Résultats disponibles du dernier bilan
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Il y a 3 heures
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 border-t text-center">
                                    <button
                                        className="text-sm text-[#FFB8C2] hover:underline"
                                        onClick={() => setActiveModule('notifications')}
                                    >
                                        Voir toutes les notifications
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* User profile */}
                    <div className="relative">
                        <button
                            className="flex items-center"
                            onClick={() => {
                                setShowUserMenu(!showUserMenu);
                                setShowNotifications(false);
                            }}
                        >
                            <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                                    alt="User"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </button>
                        {/* User menu dropdown */}
                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                <div className="p-3 border-b">
                                    <p className="font-medium text-gray-800">Utilisateur</p>
                                    <p className="text-xs text-gray-500">
                                        utilisateur@example.com
                                    </p>
                                </div>
                                <div className="py-1">
                                    <button
                                        onClick={() => setActiveModule('profile')}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <UserIcon size={16} className="mr-2" />
                                        Mon profil
                                    </button>
                                    <button
                                        onClick={() => router.push('/edit-profile')}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <UserIcon size={16} className="mr-2" />
                                        Modifier profil
                                    </button>
                                    <button
                                        onClick={() => router.push('/change-password')}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <LockIcon size={16} className="mr-2" />
                                        Changer mot de passe
                                    </button>
                                    <button
                                        onClick={() => setActiveModule('pets')}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <HeartPulseIcon size={16} className="mr-2" />
                                        Mes animaux
                                    </button>
                                    <button
                                        onClick={() => setActiveModule('settings')}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <SettingsIcon size={16} className="mr-2" />
                                        Paramètres
                                    </button>
                                </div>
                                <div className="py-1 border-t">
                                    <button
                                        onClick={() => {
                                            dispatch(logout());
                                            router.push('/auth/login');
                                        }}
                                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                        <LogOutIcon size={16} className="mr-2" />
                                        Déconnexion
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Mobile search - visible only on mobile */}
            <div className="px-4 pb-3 lg:hidden">
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <SearchIcon size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFB8C2] focus:bg-white"
                    />
                </div>
            </div>
        </header>
    );
};