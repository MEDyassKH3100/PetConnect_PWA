'use client';

import React, { useState, useEffect } from 'react';
import { UserIcon, CameraIcon, SaveIcon, CheckIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

// Interface simplifiée pour les données utilisateur (même que dans useAuth)
interface UserProfileData {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    avatar?: string;
    role: "user" | "admin" | "vet";
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export const UserProfile = () => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [profileData, setProfileData] = useState<UserProfileData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Image d'avatar statique comme demandé
    const defaultAvatar = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=250&q=80";

    // Récupérer les données du profil
    useEffect(() => {
        if (isAuthenticated && user) {
            fetchProfileData();
        }
    }, [isAuthenticated, user]);

    const fetchProfileData = async () => {
        if (!user) return;

        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération du profil');
            }

            const data = await response.json();
            setProfileData(data.user);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur de récupération');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!profileData) return;

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: profileData.firstName,
                    lastName: profileData.lastName,
                    phone: profileData.phone,
                    address: profileData.address,
                    avatar: profileData.avatar || defaultAvatar,
                }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la sauvegarde');
            }

            const data = await response.json();
            setProfileData(data.user);
            setSaveSuccess(true);

            setTimeout(() => {
                setSaveSuccess(false);
                setIsEditing(false);
            }, 2000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur de sauvegarde');
        } finally {
            setLoading(false);
        }
    };

    const formatMemberSince = (date: Date) => {
        return new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: 'long',
        }).format(new Date(date));
    };

    // Affichage pendant le chargement ou si non authentifié
    if (isLoading || !isAuthenticated) {
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Mon Profil</h1>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="animate-pulse">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="h-32 w-32 rounded-full bg-gray-200"></div>
                                <div className="text-center">
                                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                                </div>
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                                            <div className="h-8 bg-gray-200 rounded w-full"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Mon Profil</h1>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="text-center py-8">
                        <p className="text-gray-500">Erreur lors du chargement du profil</p>
                        <button
                            onClick={fetchProfileData}
                            className="mt-2 text-[#FFB8C2] hover:underline"
                        >
                            Réessayer
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Mon Profil</h1>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Profile Photo */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative">
                            <div className="h-32 w-32 rounded-full bg-gray-200 overflow-hidden">
                                <img
                                    src={profileData.avatar || defaultAvatar}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full text-white hover:from-[#FFB8C2] hover:to-[#F5F5DC]">
                                <CameraIcon size={16} />
                            </button>
                        </div>
                        <div className="text-center">
                            <h2 className="font-semibold text-gray-800">
                                {profileData.firstName} {profileData.lastName}
                            </h2>
                            <p className="text-sm text-gray-500">
                                Membre depuis {formatMemberSince(profileData.createdAt)}
                            </p>
                        </div>
                    </div>
                    {/* Profile Information */}
                    <div className="flex-1 space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Informations personnelles
                            </h2>
                            <button
                                className="text-[#FFB8C2] text-sm font-medium hover:underline"
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                {isEditing ? 'Annuler' : 'Modifier'}
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Prénom
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={profileData.firstName}
                                        onChange={(e) => setProfileData(prev => prev ? { ...prev, firstName: e.target.value } : null)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                                    />
                                ) : (
                                    <p className="text-gray-800">{profileData.firstName}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nom
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={profileData.lastName}
                                        onChange={(e) => setProfileData(prev => prev ? { ...prev, lastName: e.target.value } : null)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                                    />
                                ) : (
                                    <p className="text-gray-800">{profileData.lastName}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <p className="text-gray-800">{profileData.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Téléphone
                                </label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        value={profileData.phone || ''}
                                        onChange={(e) => setProfileData(prev => prev ? { ...prev, phone: e.target.value } : null)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                                    />
                                ) : (
                                    <p className="text-gray-800">{profileData.phone || 'Non renseigné'}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Adresse
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={profileData.address || ''}
                                        onChange={(e) => setProfileData(prev => prev ? { ...prev, address: e.target.value } : null)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                                    />
                                ) : (
                                    <p className="text-gray-800">{profileData.address || 'Non renseignée'}</p>
                                )}
                            </div>
                        </div>
                        {isEditing && (
                            <div className="flex justify-end">
                                <button
                                    className="flex items-center space-x-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white px-4 py-2 rounded-lg hover:from-[#FFB8C2] hover:to-[#F5F5DC] disabled:opacity-50"
                                    onClick={handleSave}
                                    disabled={loading}
                                >
                                    {saveSuccess ? (
                                        <>
                                            <CheckIcon size={16} />
                                            <span>Enregistré</span>
                                        </>
                                    ) : loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            <span>Sauvegarde...</span>
                                        </>
                                    ) : (
                                        <>
                                            <SaveIcon size={16} />
                                            <span>Enregistrer</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Password Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Sécurité</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mot de passe actuel
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nouveau mot de passe
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirmer le nouveau mot de passe
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                        />
                    </div>
                    <div>
                        <button className="bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white px-4 py-2 rounded-lg hover:from-[#FFB8C2] hover:to-[#F5F5DC]">
                            Mettre à jour le mot de passe
                        </button>
                    </div>
                </div>
            </div>
            {/* Preferences Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Préférences
                </h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-gray-800">
                                Notifications par email
                            </h3>
                            <p className="text-sm text-gray-500">
                                Recevoir des notifications par email pour les rappels importants
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
                            <h3 className="font-medium text-gray-800">Notifications push</h3>
                            <p className="text-sm text-gray-500">
                                Recevoir des notifications push sur votre appareil
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
                            <h3 className="font-medium text-gray-800">Newsletter</h3>
                            <p className="text-sm text-gray-500">
                                Recevoir des conseils et astuces pour vos animaux
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FFB8C2] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#F5F5DC] peer-checked:to-[#FFB8C2]"></div>
                        </label>
                    </div>
                    <div>
                        <button className="mt-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white px-4 py-2 rounded-lg hover:from-[#FFB8C2] hover:to-[#F5F5DC]">
                            Enregistrer les préférences
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};