'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CameraIcon, SaveIcon, Loader2, Lock, Eye, EyeOff } from 'lucide-react';
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

  // Password form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [actualPassword, setActualPassword] = useState<string>('');

  // Preferences
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newsletter: false,
  });

  const defaultAvatar =
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80';
  // Toggle password visibility
  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

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
      // Le mot de passe actuel doit être saisi par l'utilisateur pour des raisons de sécurité
      // On ne pré-remplit pas ce champ
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

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
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
      if (!response.ok) throw new Error(data.error || 'Erreur upload');
      setProfileData(data.user);
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
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800">Sécurité</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'currentPassword', label: 'Mot de passe actuel 🔒', field: 'current' }, { key: 'newPassword', label: 'Nouveau mot de passe', field: 'new' },
            { key: 'confirmPassword', label: 'Confirmer le mot de passe', field: 'confirm' }
          ].map(({ key, label, field }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <div className="relative">
                <input
                  type={showPasswords[field as keyof typeof showPasswords] ? 'text' : 'password'}
                  value={(passwordForm as any)[key]}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, [key]: e.target.value })
                  }
                  className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFB8C2]"
                  placeholder={key === 'currentPassword' ? 'Entrez votre mot de passe actuel' : 'Entrez votre mot de passe'}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility(field as 'current' | 'new' | 'confirm')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPasswords[field as keyof typeof showPasswords] ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Message informatif */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Mot de passe actuel</strong> : Saisissez votre mot de passe actuel pour confirmer votre identité          </p>
          <p className="text-sm text-blue-700 mt-1">
            👁️ Cliquez sur l'icône œil pour voir/masquer les mots de passe
          </p>
          <p className="text-sm text-blue-700 mt-1">
            ⚙️ Remplissez tous les champs pour changer votre mot de passe en toute sécurité.          </p>
        </div>

        {passwordMessage && (
          <div className={`mt-2 p-3 rounded-lg ${passwordMessage.includes('succès')
            ? 'bg-green-50 border border-green-200 text-green-700'
            : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
            {passwordMessage}
          </div>
        )}

        <button
          onClick={handleChangePassword}
          disabled={loading || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword} className="mt-4 flex items-center gap-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white px-6 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Lock className="w-4 h-4" />
          )}
          {loading ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
        </button>
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
