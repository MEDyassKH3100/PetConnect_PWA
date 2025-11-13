'use client';

import React, { useState, useEffect } from 'react';
import {
    GraduationCapIcon,
    BookOpenIcon,
    TrophyIcon,
    BrainIcon,
    PlayIcon,
    CheckCircleIcon,
    ClockIcon,
    Users,
    Loader2
} from 'lucide-react';
import { apiClient } from '../../lib/api-client';
interface TrainingProgram {
    id: string;
    name: string;
    category: string;
    description: string;
    icon: string;
    totalLessons: number;
    completedLessons: number;
    progress: number;
    estimatedWeeks: number;
    difficulty: string;
    lessons: any[];
}
interface BehavioralTip {
    id: string;
    title: string;
    description: string;
    category: string;
    severity: string;
    solutions: string[];
}
interface ScheduleItem {
    day: string;
    programId: string;
    programName: string;
    lesson: any;
    duration: number;
    status: string;
}

export const EducationModule = () => {
    const [programs, setPrograms] = useState<TrainingProgram[]>([]);
    const [tips, setTips] = useState<BehavioralTip[]>([]);
    const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
    const [selectedPet, setSelectedPet] = useState<string>('');
    const [pets, setPets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAllTips, setShowAllTips] = useState(false);


    // Charger les animaux de l'utilisateur
    useEffect(() => {
        fetchPets();
    }, []);

    // Charger les données d'éducation quand un animal est sélectionné
    useEffect(() => {
        if (selectedPet) {
            fetchEducationData();
        }
    }, [selectedPet]);

    const fetchPets = async () => {
        try {
            const response = await apiClient.get('/api/pets');
            setPets(response.data.pets || []);
            if (response.data.pets?.length > 0) {
                setSelectedPet(response.data.pets[0]._id);
            }
        } catch (err) {
            console.error('Erreur chargement animaux:', err);
            setError('Impossible de charger vos animaux');
        }
    };

    const fetchEducationData = async () => {
        try {
            setLoading(true);

            // Récupérer les programmes avec progression
            const programsResponse = await apiClient.get(`/api/training?type=programs&petId=${selectedPet}`);
            setPrograms(programsResponse.data.programs || []);
            setTips(programsResponse.data.tips || []);

            // Récupérer le planning
            const scheduleResponse = await apiClient.get('/api/training?type=schedule');
            setSchedule(scheduleResponse.data.schedule || []);

        } catch (err) {
            console.error('Erreur chargement données éducation:', err);
            setError('Impossible de charger les données d\'éducation');
        } finally {
            setLoading(false);
        }
    };

    const startTrainingSession = async (programId: string, lessonId: string) => {
        try {
            const program = programs.find(p => p.id === programId);
            const lesson = program?.lessons.find(l => l.id === lessonId);

            if (!lesson) {
                alert('Leçon introuvable');
                return;
            }

            // Simuler une session d'entraînement
            const duration = lesson.duration || 15;
            const score = Math.floor(Math.random() * 40) + 60; // Score entre 60-100

            await apiClient.post('/api/training', {
                petId: selectedPet,
                programId,
                lessonId,
                duration,
                score,
                difficulty: 'medium'
            });

            alert(`✅ Session terminée ! Score: ${score}/100`);

            // Recharger les données pour mettre à jour la progression
            fetchEducationData();

        } catch (err) {
            console.error('Erreur session d\'entraînement:', err);
            alert('Erreur lors de l\'enregistrement de la session');
        }
    };

    const getIconComponent = (iconName: string) => {
        switch (iconName) {
            case 'GraduationCap': return GraduationCapIcon;
            case 'BookOpen': return BookOpenIcon;
            case 'Trophy': return TrophyIcon;
            case 'Users': return Users;
            default: return GraduationCapIcon;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-[#FFB8C2]" />
                <span className="ml-2 text-gray-600">Chargement...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 text-red-600 hover:text-red-800 underline"
                >
                    Réessayer
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Module Éducation</h1>

                {/* Sélecteur d'animal */}
                {pets.length > 0 && (
                    <select
                        value={selectedPet}
                        onChange={(e) => setSelectedPet(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB8C2] focus:border-transparent"
                    >
                        {pets.map(pet => (
                            <option key={pet._id} value={pet._id}>
                                {pet.name} ({pet.type})
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {/* Progress Overview - Version dynamique */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Progression du dressage
                    {pets.find(p => p._id === selectedPet) && (
                        <span className="text-sm font-normal text-gray-600 ml-2">
                            - {pets.find(p => p._id === selectedPet)?.name}
                        </span>
                    )}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {programs.slice(0, 4).map((program) => {
                        const rotation = (program.progress / 100) * 360;
                        return (
                            <div key={program.id} className="flex flex-col items-center">
                                <div className="w-24 h-24 rounded-full border-8 border-gray-200 flex items-center justify-center mb-2 relative">
                                    <div
                                        className="absolute inset-0 rounded-full border-8 border-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] border-r-transparent border-b-transparent transition-transform duration-500"
                                        style={{ transform: `rotate(${rotation}deg)` }}
                                    ></div>
                                    <span className="text-xl font-bold text-gray-700 z-10">
                                        {program.progress}%
                                    </span>
                                </div>
                                <span className="text-sm font-medium text-gray-600 text-center">
                                    {program.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {program.completedLessons}/{program.totalLessons} leçons
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Training Programs - Version dynamique */}
            <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-3">
                    Programmes de dressage
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {programs.map((program) => {
                        const IconComponent = getIconComponent(program.icon);
                        const nextLesson = program.lessons.find(l => !l.completed) || program.lessons[0];

                        return (
                            <div key={program.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                                <div className="flex items-center mb-4">
                                    <div className="p-2 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mr-3">
                                        <IconComponent size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {program.name}
                                    </h3>
                                </div>
                                <p className="text-gray-600 mb-4">
                                    {program.description}
                                </p>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="w-2/3 bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] h-2 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${program.progress}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-600">
                                        {program.completedLessons}/{program.totalLessons} leçons
                                    </span>
                                </div>

                                {/* Badge de difficulté */}
                                <div className="mb-3">
                                    <span className={`px-2 py-1 text-xs rounded-full ${program.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                                        program.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                        {program.difficulty === 'beginner' ? 'Débutant' :
                                            program.difficulty === 'intermediate' ? 'Intermédiaire' : 'Avancé'}
                                    </span>
                                </div>

                                <button
                                    onClick={() => nextLesson && startTrainingSession(program.id, nextLesson.id)}
                                    disabled={!nextLesson}
                                    className="flex items-center gap-2 w-full justify-center bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                                >
                                    {program.progress === 100 ? (
                                        <>
                                            <CheckCircleIcon size={16} />
                                            Terminé
                                        </>
                                    ) : (
                                        <>
                                            <PlayIcon size={16} />
                                            {program.progress > 0 ? 'Continuer' : 'Commencer'}
                                        </>
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Behavioral Advice - Version dynamique */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Conseils comportementaux
                </h2>
                <div className="space-y-4">
                    {tips.slice(0, showAllTips ? tips.length : 3).map((tip) => (
                        <div key={tip.id} className="p-4 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] bg-opacity-10 rounded-lg">
                            <div className="flex items-start">
                                <div className={`p-2 rounded-full mr-3 ${tip.severity === 'high' ? 'bg-red-500' :
                                    tip.severity === 'medium' ? 'bg-yellow-500' :
                                        'bg-green-500'
                                    }`}>
                                    <BrainIcon size={20} className="text-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-medium text-gray-800">
                                            {tip.title}
                                        </h3>
                                        <span className={`px-2 py-1 text-xs rounded-full ${tip.severity === 'high' ? 'bg-red-100 text-red-800' :
                                            tip.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                            {tip.severity === 'high' ? 'Urgent' :
                                                tip.severity === 'medium' ? 'Modéré' : 'Léger'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">
                                        {tip.description}
                                    </p>
                                    <div className="text-xs text-gray-500">
                                        <strong>Solutions :</strong>
                                        <ul className="list-disc list-inside mt-1">
                                            {tip.solutions.slice(0, 2).map((solution, index) => (
                                                <li key={index}>{solution}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => setShowAllTips(!showAllTips)}
                    className="mt-4 text-[#FFB8C2] font-medium hover:underline"
                >
                    {showAllTips ?
                        'Afficher moins de conseils' :
                        `Consulter plus de conseils (${tips.length} disponibles)`
                    }
                </button>
            </div>

            {/* Training Schedule - Version dynamique */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Calendrier d'entraînement
                </h2>
                {schedule.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Jour
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Programme
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Leçon
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Durée
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Statut
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {schedule.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {item.day}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            {item.programName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {item.lesson?.title || 'Leçon suivante'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {item.duration} minutes
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'Complété' ? 'bg-green-100 text-green-800' :
                                                item.status === 'Aujourd\'hui' ? 'bg-orange-100 text-orange-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <ClockIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>Aucun planning d'entraînement généré</p>
                        <p className="text-sm">Commencez un programme pour voir votre planning</p>
                    </div>
                )}
            </div>
        </div>
    );

};