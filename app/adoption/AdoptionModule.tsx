'use client';

import React, { useEffect, useState } from 'react';
import { SearchIcon, FilterIcon, HeartIcon } from 'lucide-react';
import { AdoptionCard } from './components/AdoptionCard';
import { AdoptionPet } from '@/models/AdoptionPet';
import { BsHeartFill } from 'react-icons/bs';

export const AdoptionModule = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [pets, setPets] = useState<AdoptionPet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [favorites, setFavorites] = useState<number[]>([]);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const res = await fetch('/api/adoption');
                if (!res.ok) throw new Error('Erreur lors du chargement des animaux');
                const data: AdoptionPet[] = await res.json();
                setPets(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPets();

        // Charger les favoris depuis localStorage
        const savedFavs = localStorage.getItem('favorites');
        if (savedFavs) setFavorites(JSON.parse(savedFavs));
    }, []);

    const toggleFavorite = (petId: number) => {
        let updated: number[];
        if (favorites.includes(petId)) {
            updated = favorites.filter((id) => id !== petId);
        } else {
            updated = [...favorites, petId];
        }
        setFavorites(updated);
        localStorage.setItem('favorites', JSON.stringify(updated));
    };

    const displayedPets = pets
        .filter((pet) =>
            pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((pet) => (showFavoritesOnly ? favorites.includes(pet.id) : true));

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Module Adoption</h1>

            {/* --- Search + Filter + Favoris --- */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <SearchIcon size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Rechercher un animal..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        className="flex items-center justify-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        onClick={() => setFilterOpen(!filterOpen)}
                    >
                        <FilterIcon size={18} />
                        <span>Filtres</span>
                    </button>

                    <button
                        className={`flex items-center justify-center px-4 py-2 border rounded-md ${showFavoritesOnly
                            ? 'bg-pink-100 border-pink-400'
                            : 'bg-white border-gray-300 hover:bg-gray-50'
                            }`}
                        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                    >
                        <BsHeartFill
                            size={18}
                            className={`${showFavoritesOnly ? 'text-red-500' : 'text-gray-500'}`}
                        />
                        <span></span>
                    </button>
                </div>
            </div>

            {/* --- Adoption Grid --- */}
            {loading && <p>Chargement des animaux...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedPets.map((pet) => (
                        <AdoptionCard
                            key={pet.id}
                            {...pet}
                            isFavorite={favorites.includes(pet.id)}
                            onToggleFavorite={() => toggleFavorite(pet.id)}
                        />
                    ))}
                    {displayedPets.length === 0 && (
                        <p className="text-gray-500 col-span-full text-center mt-4">Aucun animal à afficher</p>
                    )}
                </div>
            )}

            {/* --- Contact Form --- */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Intéressé par un animal ?</h2>
                <form
                    className="space-y-4"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const body = {
                            name: formData.get('name'),
                            email: formData.get('email'),
                            phone: formData.get('phone'),
                            animal: formData.get('animal'),
                            message: formData.get('message'),
                        };

                        console.log('Envoi au serveur:', body);

                        try {
                            const res = await fetch('/api/adoption-request', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(body),
                            });

                            const data = await res.json();
                            console.log('Réponse API:', data, 'Status:', res.status);

                            if (!res.ok) throw new Error(data.error || 'Erreur envoi');

                            alert('Votre demande a été envoyée avec succès !');
                            (e.target as HTMLFormElement).reset();
                        } catch (err: any) {
                            console.error('Erreur front:', err);
                            alert(err.message);
                        }
                    }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                            <input
                                name="name"
                                type="text"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFB8C2]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFB8C2]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                            <input
                                name="phone"
                                type="tel"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFB8C2]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Animal</label>
                            <select
                                name="animal"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFB8C2]"
                            >
                                <option value="">Sélectionnez un animal</option>
                                {pets.map((pet) => (
                                    <option key={pet.id} value={`${pet.name} - ${pet.breed}`}>
                                        {pet.name} - {pet.breed}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                            name="message"
                            rows={4}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FFB8C2]"
                            placeholder="Parlez-nous un peu de vous et de votre intérêt pour cet animal..."
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white rounded-md hover:from-[#FFB8C2] hover:to-[#F5F5DC]"
                    >
                        Envoyer la demande
                    </button>
                </form>
            </div>
        </div>
    );
};