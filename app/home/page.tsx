'use client';

import { useEffect, useState } from 'react';
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
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');

    if (token) {
      setUserToken(token); // store token in state
      setLoading(false);
    } else {
      // No token → redirect to login
      router.replace('/auth/login');
    }
  }, [router]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Show loader while checking authentication
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500 text-lg">Loading...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full lg:w-auto">
        {/* Header */}
        <Header toggleSidebarAction={toggleSidebar} setActiveModuleAction={setActiveModule} />
        {/* Modules */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {activeModule === 'dashboard' && <Dashboard />}
          {activeModule === 'health' && <HealthModule />}
          {activeModule === 'nutrition' && userToken && (
            <NutritionModule token={userToken} />
          )}
          {activeModule === 'education' && <EducationModule />}
          {activeModule === 'adoption' && <AdoptionModule />}
          {activeModule === 'pets' && userToken && <UserPets token={userToken} />}
          {activeModule === 'appointments' && <UserAppointments />}
          {activeModule === 'notifications' && <UserNotifications />}
          {activeModule === 'profile' && <UserProfile />}
          {activeModule === 'settings' && <UserSettings />}
        </main>
      </div>
    </div>
  );
}