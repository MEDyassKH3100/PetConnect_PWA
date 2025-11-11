'use client';

<<<<<<< Updated upstream
import React, { useState } from 'react';
import { UserIcon, CameraIcon, SaveIcon, CheckIcon } from 'lucide-react';

export const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
=======
import React, { useState, useEffect, useRef } from 'react';
import { CameraIcon, SaveIcon, Loader2 } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/slices/hooks';
import { fetchUserProfile } from '@/store/slices/authSlice';
import { apiClient } from '@/lib/api-client';

interface UserProfileData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  role: 'user' | 'admin' | 'vet';
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const UserProfile = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
>>>>>>> Stashed changes

    const handleSave = () => {
        // Simulate saving data
        setSaveSuccess(true);
        setTimeout(() => {
            setSaveSuccess(false);
            setIsEditing(false);
        }, 2000);
    };

<<<<<<< Updated upstream
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
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=250&q=80"
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full text-white hover:from-[#FFB8C2] hover:to-[#F5F5DC]">
                                <CameraIcon size={16} />
                            </button>
                        </div>
                        <div className="text-center">
                            <h2 className="font-semibold text-gray-800">Sophie Martin</h2>
                            <p className="text-sm text-gray-500">
                                Membre depuis Janvier 2023
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
                                        defaultValue="Sophie"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                                    />
                                ) : (
                                    <p className="text-gray-800">Sophie</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nom
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        defaultValue="Martin"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                                    />
                                ) : (
                                    <p className="text-gray-800">Martin</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        defaultValue="sophie.martin@example.com"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                                    />
                                ) : (
                                    <p className="text-gray-800">sophie.martin@example.com</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Téléphone
                                </label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        defaultValue="06 12 34 56 78"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                                    />
                                ) : (
                                    <p className="text-gray-800">06 12 34 56 78</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Adresse
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        defaultValue="123 Rue de Paris, 75001 Paris"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                                    />
                                ) : (
                                    <p className="text-gray-800">123 Rue de Paris, 75001 Paris</p>
                                )}
                            </div>
                        </div>
                        {isEditing && (
                            <div className="flex justify-end">
                                <button
                                    className="flex items-center space-x-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white px-4 py-2 rounded-lg hover:from-[#FFB8C2] hover:to-[#F5F5DC]"
                                    onClick={handleSave}
                                >
                                    {saveSuccess ? (
                                        <>
                                            <CheckIcon size={16} />
                                            <span>Enregistré</span>
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
=======
  // Preferences
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newsletter: false,
  });

  const defaultAvatar =
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80';

  useEffect(() => {
    if (isAuthenticated && !user) {
      // Charger le profil utilisateur depuis Redux si pas encore chargé
      dispatch(fetchUserProfile());
    }
    if (isAuthenticated && user) {
      fetchProfileData();
    }
  }, [isAuthenticated, user, dispatch]);

  const fetchProfileData = async () => {
    try {
      console.log('🔍 Chargement du profil utilisateur...');
      const response = await apiClient.get('/api/profile');
      console.log('✅ Profil chargé:', response.data);
      setProfileData(response.data.user);
    } catch (err: any) {
      console.error('❌ Erreur chargement profil:', err);
      setError(err.response?.data?.error || err.message || 'Erreur de récupération');
    }
  };

  const handleSaveProfile = async () => {
    if (!profileData) return;
    setLoading(true);
    setError(null);
    try {
      console.log('💾 Sauvegarde du profil...');
      const response = await apiClient.put('/api/profile', profileData);
      console.log('✅ Profil sauvegardé:', response.data);
      setProfileData(response.data.user);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de mise à jour');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage('Les nouveaux mots de passe ne correspondent pas.');
      return;
    }
    setLoading(true);
    setPasswordMessage(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/profile/password', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Erreur mot de passe');
      setPasswordMessage('Mot de passe mis à jour avec succès ✅');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPasswordMessage(err instanceof Error ? err.message : 'Erreur de changement');
    } finally {
      setLoading(false);
    }
  };

  const handlePreferencesSave = () => {
    localStorage.setItem('preferences', JSON.stringify(preferences));
    alert('Préférences sauvegardées ✅');
  };

  // 📸 ---- Upload avatar ----
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch('/api/profile/avatar', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });


      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Erreur upload avatar');

      setProfileData((prev) => (prev ? { ...prev, avatar: data.avatarUrl } : prev));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur upload image');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) =>
    new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long' }).format(
      new Date(date)
    );

  if (isLoading || !isAuthenticated)
    return <div className="text-center text-gray-500">Chargement du profil...</div>;

  if (!profileData)
    return <div className="text-center text-red-500">Erreur de chargement du profil</div>;

  return (
    <div className="space-y-6">
      {/* ----------- Header ------------- */}
      <h1 className="text-2xl font-bold text-gray-800">Mon Profil</h1>

      {/* ----------- Profile Section ------------- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="h-32 w-32 rounded-full overflow-hidden border border-gray-300">
                <img
                  src={profileData.avatar || defaultAvatar}
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Upload button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-[#FFB8C2] p-2 rounded-full text-white hover:opacity-80"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <CameraIcon size={16} />}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            <div className="text-center">
              <h2 className="font-semibold text-gray-800">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-sm text-gray-500">
                Membre depuis {formatDate(profileData.createdAt)}
              </p>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Informations personnelles
              </h2>
              <button
                className="text-[#FFB8C2] font-medium"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Annuler' : 'Modifier'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['firstName', 'lastName', 'email', 'phone', 'address'].map((field) => (
                <div key={field}>
                  <label className="block text-sm text-gray-600 mb-1 capitalize">
                    {field === 'firstName'
                      ? 'Prénom'
                      : field === 'lastName'
                        ? 'Nom'
                        : field === 'email'
                          ? 'Email'
                          : field === 'phone'
                            ? 'Téléphone'
                            : 'Adresse'}
                  </label>
                  {isEditing && field !== 'email' ? (
                    <input
                      type="text"
                      value={(profileData as any)[field] || ''}
                      onChange={(e) =>
                        setProfileData({ ...profileData, [field]: e.target.value })
                      }
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#FFB8C2]"
                    />
                  ) : (
                    <p className="text-gray-800">{(profileData as any)[field] || '-'}</p>
                  )}
>>>>>>> Stashed changes
                </div>
            </div>
        </div>
<<<<<<< Updated upstream
    );
};
=======
      </div>

      {/* ----------- Password Section ------------- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Sécurité</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['currentPassword', 'newPassword', 'confirmPassword'].map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {key === 'currentPassword'
                  ? 'Mot de passe actuel'
                  : key === 'newPassword'
                    ? 'Nouveau mot de passe'
                    : 'Confirmer le mot de passe'}
              </label>
              <input
                type="password"
                value={(passwordForm as any)[key]}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, [key]: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFB8C2]"
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleChangePassword}
          disabled={loading}
          className="mt-4 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white px-4 py-2 rounded-lg hover:opacity-90"
        >
          {loading ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
        </button>
        {passwordMessage && (
          <p className="mt-2 text-sm text-center text-gray-700">{passwordMessage}</p>
        )}
      </div>

      {/* ----------- Preferences Section ------------- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Préférences</h2>
        {Object.entries(preferences).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between border-b py-3 last:border-0"
          >
            <div>
              <h3 className="font-medium text-gray-800 capitalize">
                {key === 'emailNotifications'
                  ? 'Notifications par email'
                  : key === 'pushNotifications'
                    ? 'Notifications push'
                    : 'Newsletter'}
              </h3>
            </div>
            <input
              type="checkbox"
              checked={value}
              onChange={(e) =>
                setPreferences({ ...preferences, [key]: e.target.checked })
              }
              className="h-5 w-5 accent-[#FFB8C2]"
            />
          </div>
        ))}
        <button
          onClick={handlePreferencesSave}
          className="mt-4 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white px-4 py-2 rounded-lg hover:opacity-90"
        >
          Enregistrer les préférences
        </button>
      </div>
    </div>
  );
};
>>>>>>> Stashed changes
