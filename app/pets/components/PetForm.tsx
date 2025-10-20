'use client';

import React, { useState } from 'react';
import { XIcon, SaveIcon, UploadIcon } from 'lucide-react';

interface PetFormProps {
  pet?: {
    _id?: string;
    name: string;
    type: string;
    breed: string;
    age?: string;
    gender: string;
    weight?: string;
    image?: string;
    microchip?: string;
    birthdate?: string;
    status?: string;
  };
  token: string;
  onSaved: () => void;
  onClose: () => void;
}

export const PetForm = ({ pet, token, onSaved, onClose }: PetFormProps) => {
  const [formData, setFormData] = useState({
    name: pet?.name || '',
    type: pet?.type || 'Chien',
    breed: pet?.breed || '',
    age: pet?.age || '', // Added age field
    gender: pet?.gender || 'Mâle',
    birthdate: pet?.birthdate || '',
    weight: pet?.weight?.replace(' kg', '') || '',
    microchip: pet?.microchip || '',
    image: pet?.image || '',
    status: pet?.status || 'Actif',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
const method = pet ? 'PATCH' : 'POST';
const url = '/api/pets';

const body = pet ? { id: pet._id, ...formData } : formData; 

const res = await fetch(url, {
  method,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(body),
});


      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur serveur');

      onSaved(); // refresh pet list
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {pet ? 'Modifier les informations' : 'Ajouter un animal'}
        </h2>
        <button className="p-1 rounded-full hover:bg-gray-100" onClick={onClose}>
          <XIcon size={20} className="text-gray-500" />
        </button>
      </div>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Upload */}
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="relative w-48 h-48 bg-gray-100 rounded-lg overflow-hidden mb-2">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <UploadIcon size={36} className="text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 text-center px-4">
                    Glissez une image ou cliquez pour parcourir
                  </p>
                </div>
              )}
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setFormData((prev) => ({ ...prev, image: reader.result as string }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
            <p className="text-xs text-gray-500">Format JPG ou PNG, 5MB max</p>
          </div>

          {/* Form Fields */}
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Nom"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
              required
            />
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
            >
              <option value="Chien">Chien</option>
              <option value="Chat">Chat</option>
              <option value="Lapin">Lapin</option>
              <option value="Oiseau">Oiseau</option>
              <option value="Autre">Autre</option>
            </select>
            <input
              type="text"
              name="breed"
              placeholder="Race"
              value={formData.breed}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
            />
            <input
              type="number"
              name="age"
              placeholder="Âge (ans)"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
              required
              min={0}
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
            >
              <option value="Mâle">Mâle</option>
              <option value="Femelle">Femelle</option>
            </select>
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
            />
            <input
              type="number"
              step="0.1"
              min="0"
              name="weight"
              placeholder="Poids (kg)"
              value={formData.weight}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
            />
            <input
              type="text"
              name="microchip"
              placeholder="Numéro de puce (optionnel)"
              value={formData.microchip}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
            >
              <option value="Actif">Actif</option>
              <option value="Inactif">Inactif</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white rounded-md hover:from-[#FFB8C2] hover:to-[#F5F5DC] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <SaveIcon size={16} />
            <span>{pet ? 'Enregistrer' : 'Ajouter'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
