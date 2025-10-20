'use client';

import React, { useEffect, useState } from 'react';
import {
  PlusIcon,
  EditIcon,
  Trash2Icon,
  CalendarIcon,
  HeartIcon,
  TagIcon,
} from 'lucide-react';
import { PetForm } from './components/PetForm';

interface Pet {
  _id: string;
  name: string;
  type: string;
  breed: string;
  age?: string;
  gender: string;
  weight?: string;
  image?: string;
  microchip?: string;
  birthdate?: string;
  status: string;
}

interface UserPetsProps {
  token: string;
}

export const UserPets = ({ token }: UserPetsProps) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  // Fetch all pets
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
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  // Add new pet
  const handleAddPet = () => {
    setEditingPet(null);
    setShowForm(true);
  };

  // Edit existing pet
  const handleEditPet = (pet: Pet) => {
    setEditingPet(pet);
    setShowForm(true);
  };

  // Delete pet
  const handleDeletePet = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cet animal ?')) return;
    try {
      const res = await fetch(`/api/pets?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Erreur lors de la suppression');
      setPets((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Called after adding/editing pet
  const handleSaved = async (pet?: Pet) => {
    setShowForm(false);
    setEditingPet(null);
    await fetchPets();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Mes Animaux</h1>
        <button
          className="flex items-center space-x-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white px-3 py-2 rounded-lg hover:from-[#FFB8C2] hover:to-[#F5F5DC]"
          onClick={handleAddPet}
        >
          <PlusIcon size={16} />
          <span>Ajouter un animal</span>
        </button>
      </div>

      {showForm && (
        <PetForm
          pet={editingPet || undefined}
          token={token}
          onSaved={handleSaved}
          onClose={() => setShowForm(false)}
        />
      )}

      {!showForm && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/3 h-48 sm:h-auto">
                  <img
                    src={pet.image || '/default-pet.png'}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{pet.name}</h2>
                      <p className="text-gray-500">
                        {pet.breed} • {pet.age || '—'}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="p-1 text-[#FFB8C2] hover:bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] hover:bg-opacity-10 rounded"
                        onClick={() => handleEditPet(pet)}
                      >
                        <EditIcon size={18} />
                      </button>
                      <button
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                        onClick={() => handleDeletePet(pet._id)}
                      >
                        <Trash2Icon size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center text-sm">
                      <TagIcon size={16} className="mr-2 text-gray-400" />
                      <span className="text-gray-600">{pet.type}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CalendarIcon size={16} className="mr-2 text-gray-400" />
                      <span className="text-gray-600">
                        Né(e) le: {pet.birthdate || '—'}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <HeartIcon size={16} className="mr-2 text-gray-400" />
                      <span className="text-gray-600">Poids: {pet.weight || '—'}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        pet.status === 'Actif'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {pet.status}
                    </span>
                    <button className="text-sm text-[#FFB8C2] hover:underline">
                      Voir le profil complet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
