'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CameraIcon, SaveIcon, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

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
  const { user, isAuthenticated, isLoading } = useAuth();
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  // Preferences
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newsletter: false,
  });

  const defaultAvatar =
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80';

  useEffect(() => {
    if (isAuthenticated && user) fetchProfileData();
  }, [isAuthenticated, user]);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Erreur profil');
      setProfileData(data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de récupération');
    }
  };

  const handleSaveProfile = async () => {
    if (!profileData) return;
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Erreur de sauvegarde');
      setProfileData(data.user);
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
                </div>
              ))}
            </div>

            {isEditing && (
              <button
                onClick={handleSaveProfile}
                disabled={loading}
                className="mt-4 flex items-center bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white px-4 py-2 rounded-lg hover:opacity-90"
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : <SaveIcon className="mr-2" />}
                {saveSuccess ? 'Enregistré ✅' : 'Sauvegarder'}
              </button>
            )}
          </div>
        </div>
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
