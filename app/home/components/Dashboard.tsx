'use client';

import React, { useEffect, useState } from 'react';
import { AIAssistantCard } from './AIAssistantCard';
import { ReminderWidget } from './ReminderWidget';
import { HealthStatusCard } from './HealthStatusCard';
import { PetProfiles } from './PetProfiles';
import { ModuleCard } from './ModuleCard';
import { PetForm } from '@/app/pets/components/PetForm';
import {
  HeartPulseIcon,
  UtensilsIcon,
  GraduationCapIcon,
  HomeIcon,
  CalendarIcon,
  ActivityIcon,
  ClipboardListIcon,
  BrainIcon,
} from 'lucide-react';

export const Dashboard = () => {
  const [token, setToken] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Example: grab token from localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) setToken(storedToken);
  }, []);

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Vue d'ensemble</h1>

      {/* Top row - AI Assistant and Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AIAssistantCard />
        <ReminderWidget />
      </div>

      {/* Health Status Row */}
      <div>
        <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">Statut Santé</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <HealthStatusCard
            title="Vaccins"
            status="warning"
            value="1 à jour sur 2"
            icon={<ActivityIcon className="text-orange-500" />}
          />
          <HealthStatusCard
            title="Poids"
            status="success"
            value="25.5 kg"
            icon={<ActivityIcon className="text-green-500" />}
          />
          <HealthStatusCard
            title="Activité"
            status="success"
            value="Excellent"
            icon={<ActivityIcon className="text-green-500" />}
          />
          <HealthStatusCard
            title="Médication"
            status="info"
            value="Aucune"
            icon={<ClipboardListIcon className="text-blue-500" />}
          />
        </div>
      </div>

      {/* Pet Profiles */}
      {token && (
        <>
          {showForm && (
            <PetForm token={token} onSaved={() => setShowForm(false)} onClose={() => setShowForm(false)} />
          )}
          <PetProfiles token={token} onAddPet={() => setShowForm(true)} />
        </>
      )}

      {/* Modules Grid */}
      <div>
        <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">Modules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <ModuleCard
            title="Santé"
            description="Carnet de santé, rappels et historique médical"
            icon={<HeartPulseIcon size={24} />}
            color="bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2]"
            link="health"
          />
          <ModuleCard
            title="Nutrition"
            description="Suivi du poids et recommandations alimentaires"
            icon={<UtensilsIcon size={24} />}
            color="bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2]"
            link="nutrition"
          />
          <ModuleCard
            title="Éducation"
            description="Programmes de dressage et conseils comportementaux"
            icon={<GraduationCapIcon size={24} />}
            color="bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2]"
            link="education"
          />
          <ModuleCard
            title="Adoption"
            description="Catalogue d'animaux disponibles à l'adoption"
            icon={<HomeIcon size={24} />}
            color="bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2]"
            link="adoption"
          />
        </div>
      </div>

      {/* Quick Access Features */}
      <div>
        <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">Accès rapide</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* Example quick access buttons */}
          <button className="flex flex-col items-center justify-center p-3 sm:p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] p-2 rounded-full mb-2">
              <CalendarIcon size={20} className="text-white" />
            </div>
            <span className="text-xs sm:text-sm text-gray-700">Rendez-vous</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 sm:p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] p-2 rounded-full mb-2">
              <ClipboardListIcon size={20} className="text-white" />
            </div>
            <span className="text-xs sm:text-sm text-gray-700">Dossier médical</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 sm:p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] p-2 rounded-full mb-2">
              <BrainIcon size={20} className="text-white" />
            </div>
            <span className="text-xs sm:text-sm text-gray-700">Diagnostic IA</span>
          </button>
          {/* Add more buttons as needed */}
        </div>
      </div>
    </div>
  );
};
