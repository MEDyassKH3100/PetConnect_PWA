'use client';

import React, { useState } from 'react';
import {
    PlusIcon,
    EditIcon,
    Trash2Icon,
    CalendarIcon,
    HeartIcon,
    TagIcon,
} from 'lucide-react';
import { PetForm } from './components/PetForm';

export const UserPets = () => {
    const [showAddPetForm, setShowAddPetForm] = useState(false);
    const [editingPetId, setEditingPetId] = useState<string | null>(null);

    const pets = [
        {
            id: '1',
            name: 'Max',
            type: 'Chien',
            breed: 'Labrador',
            age: '3 ans',
            gender: 'Mâle',
            weight: '25.5 kg',
            image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
            microchip: '123456789012345',
            birthdate: '15/06/2020',
            status: 'Actif',
        },
        {
            id: '2',
            name: 'Mia',
            type: 'Chat',
            breed: 'Européen',
            age: '2 ans',
            gender: 'Femelle',
            weight: '4.2 kg',
            image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
            microchip: '987654321098765',
            birthdate: '03/04/2021',
            status: 'Actif',
        },
    ];

    const handleAddPet = () => {
        setShowAddPetForm(true);
        setEditingPetId(null);
    };

    const handleEditPet = (id: string) => {
        setEditingPetId(id);
        setShowAddPetForm(true);
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
            {showAddPetForm ? (
                <PetForm
                    pet={editingPetId ? pets.find((p) => p.id === editingPetId) : undefined}
                    onClose={() => {
                        setShowAddPetForm(false);
                        setEditingPetId(null);
                    }}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pets.map((pet) => (
                        <div
                            key={pet.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                        >
                            <div className="flex flex-col sm:flex-row">
                                <div className="sm:w-1/3 h-48 sm:h-auto">
                                    <img
                                        src={pet.image}
                                        alt={pet.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4 flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800">
                                                {pet.name}
                                            </h2>
                                            <p className="text-gray-500">
                                                {pet.breed} • {pet.age}
                                            </p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                className="p-1 text-[#FFB8C2] hover:bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] hover:bg-opacity-10 rounded"
                                                onClick={() => handleEditPet(pet.id)}
                                            >
                                                <EditIcon size={18} />
                                            </button>
                                            <button className="p-1 text-red-500 hover:bg-red-50 rounded">
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
                                                Né(e) le: {pet.birthdate}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <HeartIcon size={16} className="mr-2 text-gray-400" />
                                            <span className="text-gray-600">Poids: {pet.weight}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-between items-center">
                                        <span
                                            className={`px-2 py-1 text-xs font-medium rounded-full ${pet.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
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
            {!showAddPetForm && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Documents
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Animal
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        Max
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        Carnet de vaccination
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        20/08/2023
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button className="text-[#FFB8C2] hover:underline mr-3">
                                            Télécharger
                                        </button>
                                        <button className="text-red-500 hover:underline">
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        Mia
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        Certificat d'identification
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        15/04/2021
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button className="text-[#FFB8C2] hover:underline mr-3">
                                            Télécharger
                                        </button>
                                        <button className="text-red-500 hover:underline">
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        Max
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        Résultats analyse
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        15/09/2023
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button className="text-[#FFB8C2] hover:underline mr-3">
                                            Télécharger
                                        </button>
                                        <button className="text-red-500 hover:underline">
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button className="flex items-center space-x-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white px-3 py-2 rounded-lg hover:from-[#FFB8C2] hover:to-[#F5F5DC]">
                            <PlusIcon size={16} />
                            <span>Ajouter un document</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};