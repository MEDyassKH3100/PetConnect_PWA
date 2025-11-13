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

interface UserProfile {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
}

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

                {/* Logo/Home */}
                <div className="text-lg font-bold text-gray-800 hidden md:block">
                    PetConnect
                </div>

                {/* Right side icons */}
                <div className="flex items-center space-x-4">
                    {/* AI Assistant */}
                    <button className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full text-white hover:from-[#FFB8C2] hover:to-[#F5F5DC]">
                        <MessageSquareIcon size={20} />
                    </button>

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
                                {user?.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt={`${user.firstName || 'Utilisateur'}`}
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            // Fallback vers image par défaut si erreur de chargement
                                            e.currentTarget.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80';
                                        }}
                                    />
                                ) : (
                                    <div className="h-full w-full bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] flex items-center justify-center">
                                        <UserIcon size={16} className="text-white" />
                                    </div>
                                )}
                            </div>
                        </button>

                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                <div className="p-3 border-b">
                                    <p className="font-medium text-gray-800">
                                        {user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Utilisateur' : 'Utilisateur'}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {user?.email || 'utilisateur@example.com'}
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

            {/* Mobile search */}
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
