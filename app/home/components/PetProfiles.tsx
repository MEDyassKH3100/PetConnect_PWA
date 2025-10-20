'use client';

import React, { useEffect, useState } from 'react';
import { PlusIcon } from 'lucide-react';

interface Pet {
  _id: string;
  name: string;
  breed: string;
  age?: string;
  image?: string;
  status: string;
}

interface PetProfilesProps {
  token?: string;
  onAddPet?: () => void;
}

export const PetProfiles = ({ token, onAddPet }: PetProfilesProps) => {
  const [pets, setPets] = useState<Pet[]>([]);

  const fetchPets = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/pets', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setPets(data.pets);
      else throw new Error(data.error || 'Erreur lors du chargement');
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [token]);

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Mes animaux</h2>

      <div className="flex space-x-4 overflow-x-auto pb-2">
        {pets.map((pet) => (
          <div
            key={pet._id}
            className="flex-shrink-0 w-40 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="h-32 overflow-hidden">
              <img
                src={pet.image || '/default-pet.png'}
                alt={pet.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-gray-800">{pet.name}</h3>
              <p className="text-xs text-gray-500">
                {pet.breed} • {pet.age || '—'}
              </p>
              <div className="mt-2 flex justify-between items-center">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    pet.status === 'Actif'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {pet.status}
                </span>
                <button className="text-xs text-[#FFB8C2] hover:underline">
                  Profil
                </button>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={onAddPet}
          className="flex-shrink-0 w-40 h-full flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-300 p-6 hover:bg-gray-100 transition-colors"
        >
          <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mb-2">
            <PlusIcon size={20} className="text-white" />
          </div>
          <p className="text-sm text-gray-600 text-center">Ajouter un animal</p>
        </button>
      </div>
    </div>
  );
};
