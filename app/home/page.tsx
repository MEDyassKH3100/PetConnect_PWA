'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { HealthModule } from '../health/HealthModule';
import { NutritionModule } from '../nutrition/NutritionModule';
import { EducationModule } from '../education/EducationModule';
import { AdoptionModule } from '../adoption/AdoptionModule';
import { UserPets } from '../pets/UserPets';
import { UserAppointments } from '../appointments/UserAppointments';
import { UserNotifications } from '../notifications/UserNotifications';
import { UserProfile } from '../profile/UserProfile';
import { UserSettings } from '../settings/UserSettings';

export default function HomePage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeModule, setActiveModule] = useState('dashboard');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} setActiveModule={setActiveModule} />

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeModule === 'dashboard' && <Dashboard />}
          {activeModule === 'health' && <HealthModule />}
          {activeModule === 'nutrition' && <NutritionModule />}
          {activeModule === 'education' && <EducationModule />}
          {activeModule === 'adoption' && <AdoptionModule />}
          {activeModule === 'pets' && <UserPets />}
          {activeModule === 'appointments' && <UserAppointments />}
          {activeModule === 'notifications' && <UserNotifications />}
          {activeModule === 'profile' && <UserProfile />}
          {activeModule === 'settings' && <UserSettings />}
        </main>
      </div>
    </div>
  );
}