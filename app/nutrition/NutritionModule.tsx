'use client';

import React, { useEffect, useState } from 'react';
import { UtensilsIcon, ScaleIcon, ClipboardIcon, Trash2Icon } from 'lucide-react';
import { NutritionChart } from './components/NutritionChart';

interface Pet {
    _id: string;
    name: string;
    type: string;
    breed: string;
    age?: number;
    weight?: number;
    image?: string;
    currentDiet?: { name: string; description: string; amount: string }[];
}

interface WeightEntry {
    _id: string;
    weight: number;
    date: string;
}

interface NutritionModuleProps {
    token: string;
}

export const NutritionModule = ({ token }: NutritionModuleProps) => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [selectedPetId, setSelectedPetId] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [weights, setWeights] = useState<WeightEntry[]>([]);

    // Ration calculator state
    const [weight, setWeight] = useState<number | ''>('');
    const [age, setAge] = useState<number | ''>('');
    const [activityLevel, setActivityLevel] = useState<string>('Sédentaire');
    const [foodType, setFoodType] = useState<string>('Croquettes sèches');
    const [recommendedRation, setRecommendedRation] = useState<string>('');

    // Fetch all pets
    const fetchPets = async () => {
        if (!token) return;
        try {
            const res = await fetch('/api/pets', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (res.ok) {
                setPets(data.pets);
                if (data.pets.length > 0) setSelectedPetId(data.pets[0]._id);
            } else setPets([]);
        } catch {
            setPets([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch weights for selected pet
    const fetchWeights = async (petId: string) => {
        if (!token) return;
        try {
            const res = await fetch(`/api/pets/${petId}/weights`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (res.ok) setWeights(data.weights);
            else setWeights([]);
        } catch {
            setWeights([]);
        }
    };

    useEffect(() => {
        fetchPets();
    }, [token]);

    useEffect(() => {
        if (selectedPetId) fetchWeights(selectedPetId);
    }, [selectedPetId, token]);

    const selectedPet = pets.find((p) => p._id === selectedPetId);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500 text-lg">Chargement des animaux...</p>
            </div>
        );
    }

    if (!selectedPet) {
        return <p className="text-gray-500">Vous n'avez aucun animal enregistré.</p>;
    }

    // Add new weight
    const handleAddWeight = async () => {
        if (!weight || isNaN(Number(weight))) {
            alert('Veuillez entrer un poids valide !');
            return;
        }

        try {
            const res = await fetch(`/api/pets/${selectedPet._id}/weights`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ weight: Number(weight) }),
            });

            const data = await res.json();
            if (res.ok) {
                alert('✅ Mesure ajoutée avec succès !');
                setWeight(''); // reset input
                fetchWeights(selectedPet._id); // refresh weights + chart
            } else {
                alert(`Erreur: ${data.error}`);
            }
        } catch {
            alert('Erreur lors de l’ajout de la mesure.');
        }
    };

    // Delete a weight
    const handleDeleteWeight = async (weightId: string) => {
        if (!token) return;
        if (!confirm('Voulez-vous vraiment supprimer cette mesure ?')) return;

        try {
            const res = await fetch(`/api/pets/${selectedPet._id}/weights`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ weightId }),
            });
            const data = await res.json();
            if (res.ok) {
                alert('Mesure supprimée avec succès !');
                fetchWeights(selectedPet._id);
            } else {
                alert(`Erreur: ${data.error}`);
            }
        } catch {
            alert('Erreur lors de la suppression de la mesure.');
        }
    };

    // Simple ration calculation
    const calculateRation = (e: React.FormEvent) => {
        e.preventDefault();
        if (!weight || !age) return;

        let factor = 1;
        switch (activityLevel) {
            case 'Sédentaire':
                factor = 0.8;
                break;
            case 'Modéré':
                factor = 1;
                break;
            case 'Actif':
                factor = 1.2;
                break;
            case 'Très actif':
                factor = 1.4;
                break;
        }

        const ration = (weight as number) * factor * 10;
        setRecommendedRation(`${ration.toFixed(0)} g/jour (${foodType})`);
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Module Nutrition</h1>

            {/* Pet selector */}
            <div className="mb-4 sm:mb-6">
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">Choisir un animal :</label>
                <select
                    value={selectedPetId || ''}
                    onChange={(e) => setSelectedPetId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2] text-sm sm:text-base"
                >
                    {pets.map((pet) => (
                        <option key={pet._id} value={pet._id}>
                            {pet.name} ({pet.breed})
                        </option>
                    ))}
                </select>
            </div>

            {/* Weight chart */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                    Évolution du poids de {selectedPet.name}
                </h2>
                <div className="h-48 sm:h-64 w-full">
                    <NutritionChart weights={weights} />
                </div>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
                {/* Suivi du poids */}
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                        <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-3">
                            <ScaleIcon size={24} className="text-white" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800">Suivi du poids</h3>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Enregistrez et suivez l'évolution du poids de {selectedPet.name}.
                    </p>

                    {/* Input + Button */}
                    <div className="mb-4">
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Nouveau poids (kg)
                        </label>
                        <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2] text-sm sm:text-base"
                            value={weight}
                            onChange={(e) => setWeight(Number(e.target.value))}
                            placeholder={`Poids de ${selectedPet.name}`}
                        />
                        <button
                            onClick={handleAddWeight}
                            className="mt-2 sm:mt-3 w-full bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white px-4 py-2 rounded-lg hover:from-[#FFB8C2] hover:to-[#F5F5DC] transition-all text-sm sm:text-base"
                        >
                            ➥ Ajouter une mesure
                        </button>
                    </div>

                    {/* List of weights */}
                    <div className="mt-4 space-y-1 max-h-48 overflow-y-auto">
                        {weights.length === 0 && <p className="text-sm text-gray-500">Aucune mesure enregistrée.</p>}
                        {weights.map((w) => (
                            <div key={w._id} className="flex justify-between items-center border-b py-2">
                                <span className="text-xs sm:text-sm text-gray-500">
                                    {new Date(w.date).toLocaleDateString()}: {w.weight} kg
                                </span>
                                <button
                                    onClick={() => handleDeleteWeight(w._id)}
                                    className="text-red-500 hover:text-red-700 p-1 rounded"
                                    title="Supprimer la mesure"
                                >
                                    <Trash2Icon size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recommandations */}
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                        <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-3">
                            <ClipboardIcon size={24} className="text-white" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800">Recommandations</h3>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                        Recevez des conseils nutritionnels personnalisés pour {selectedPet.name}.
                    </p>
                    <button className="text-[#FFB8C2] font-medium hover:underline">Consulter</button>
                </div>
            </div>

            {/* Ration calculator */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Calculateur de rations</h2>
                <form className="space-y-3 sm:space-y-4" onSubmit={calculateRation}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                Poids actuel (kg)
                            </label>
                            <input
                                type="number"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2] text-sm sm:text-base"
                                value={weight}
                                onChange={(e) => setWeight(Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Âge</label>
                            <input
                                type="number"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2] text-sm sm:text-base"
                                value={age}
                                onChange={(e) => setAge(Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Niveau d'activité
                            </label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                                value={activityLevel}
                                onChange={(e) => setActivityLevel(e.target.value)}
                            >
                                <option>Sédentaire</option>
                                <option>Modéré</option>
                                <option>Actif</option>
                                <option>Très actif</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Type d'alimentation
                            </label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2]"
                                value={foodType}
                                onChange={(e) => setFoodType(e.target.value)}
                            >
                                <option>Croquettes sèches</option>
                                <option>Nourriture humide</option>
                                <option>Alimentation mixte</option>
                                <option>BARF / Raw feeding</option>
                            </select>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white px-4 py-2 rounded-lg hover:from-[#FFB8C2] hover:to-[#F5F5DC]"
                    >
                        Calculer la ration
                    </button>
                </form>
                {recommendedRation && (
                    <p className="mt-3 text-gray-700 font-medium">
                        Ration recommandée: {recommendedRation}
                    </p>
                )}
            </div>
        </div>
    );
};