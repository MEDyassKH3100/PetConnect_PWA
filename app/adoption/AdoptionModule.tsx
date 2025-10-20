'use client';

import React, { useState } from 'react';
import { SearchIcon, FilterIcon, HeartIcon } from 'lucide-react';
import { AdoptionCard } from './components/AdoptionCard';

export const AdoptionModule = () => {
    const [filterOpen, setFilterOpen] = useState(false);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Module Adoption</h1>
            {/* Search and filter */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <SearchIcon size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Rechercher un animal..."
                            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                        />
                    </div>
                    <button
                        className="flex items-center justify-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        onClick={() => setFilterOpen(!filterOpen)}
                    >
                        <FilterIcon size={18} />
                        <span>Filtres</span>
                    </button>
                </div>
                {filterOpen && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 pt-4 border-t">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Type d'animal
                            </label>
                            <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]">
                                <option value="">Tous</option>
                                <option value="dog">Chien</option>
                                <option value="cat">Chat</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Âge
                            </label>
                            <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]">
                                <option value="">Tous</option>
                                <option value="baby">Bébé</option>
                                <option value="young">Jeune</option>
                                <option value="adult">Adulte</option>
                                <option value="senior">Sénior</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Taille
                            </label>
                            <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]">
                                <option value="">Toutes</option>
                                <option value="small">Petit</option>
                                <option value="medium">Moyen</option>
                                <option value="large">Grand</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Localisation
                            </label>
                            <input
                                type="text"
                                placeholder="Code postal ou ville"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                            />
                        </div>
                        <div className="md:col-span-4 flex justify-end">
                            <button className="px-4 py-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white rounded-md hover:from-[#FFB8C2] hover:to-[#F5F5DC]">
                                Appliquer les filtres
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {/* Adoption Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AdoptionCard
                    name="Luna"
                    type="Chien"
                    breed="Berger Allemand"
                    age="2 ans"
                    gender="Femelle"
                    location="Paris"
                    distance="5 km"
                    image="https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                />
                <AdoptionCard
                    name="Oscar"
                    type="Chat"
                    breed="Européen"
                    age="1 an"
                    gender="Mâle"
                    location="Lyon"
                    distance="10 km"
                    image="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                />
                <AdoptionCard
                    name="Rex"
                    type="Chien"
                    breed="Labrador"
                    age="4 ans"
                    gender="Mâle"
                    location="Marseille"
                    distance="8 km"
                    image="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                />
                <AdoptionCard
                    name="Mia"
                    type="Chat"
                    breed="Siamois"
                    age="3 ans"
                    gender="Femelle"
                    location="Toulouse"
                    distance="15 km"
                    image="https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                />
                <AdoptionCard
                    name="Rocky"
                    type="Chien"
                    breed="Bulldog"
                    age="5 ans"
                    gender="Mâle"
                    location="Nice"
                    distance="20 km"
                    image="https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                />
                <AdoptionCard
                    name="Bella"
                    type="Chien"
                    breed="Golden Retriever"
                    age="1 an"
                    gender="Femelle"
                    location="Bordeaux"
                    distance="12 km"
                    image="https://images.unsplash.com/photo-1633722715463-d30f4f325e24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                />
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-8">
                <nav className="inline-flex rounded-md shadow">
                    <button className="py-2 px-4 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-l-md">
                        Précédent
                    </button>
                    <button className="py-2 px-4 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        1
                    </button>
                    <button className="py-2 px-4 border-t border-b border-gray-300 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white text-sm font-medium">
                        2
                    </button>
                    <button className="py-2 px-4 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        3
                    </button>
                    <button className="py-2 px-4 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-r-md">
                        Suivant
                    </button>
                </nav>
            </div>
            {/* Contact Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Intéressé par un animal ?
                </h2>
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nom
                            </label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Téléphone
                            </label>
                            <input
                                type="tel"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Animal qui vous intéresse
                            </label>
                            <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]">
                                <option value="">Sélectionnez un animal</option>
                                <option value="luna">Luna - Berger Allemand</option>
                                <option value="oscar">Oscar - Chat Européen</option>
                                <option value="rex">Rex - Labrador</option>
                                <option value="mia">Mia - Siamois</option>
                                <option value="rocky">Rocky - Bulldog</option>
                                <option value="bella">Bella - Golden Retriever</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Message
                        </label>
                        <textarea
                            rows={4}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
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