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
    const checkAuth = async () => {
      // Vérifier la présence du token
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!token) {
        // Pas de token → rediriger vers login
        console.log('❌ Aucun token trouvé, redirection vers login');
        router.replace('/?showLogin=true&message=Veuillez vous connecter');
        return;
      }

      try {
        // Vérifier si le token est valide en faisant une requête test
        const response = await fetch('/api/profile', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.ok) {
          // Token valide
          setUserToken(token);
          setLoading(false);
          console.log('✅ Token valide, accès autorisé');
        } else if (response.status === 401 && refreshToken) {
          // Token expiré, essayer de le rafraîchir
          console.log('⏳ Token expiré, tentative de rafraîchissement...');
          const refreshResponse = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
          });

          if (refreshResponse.ok) {
            const data = await refreshResponse.json();
            localStorage.setItem('token', data.token);
            setUserToken(data.token);
            setLoading(false);
            console.log('✅ Token rafraîchi avec succès');
          } else {
            // Refresh token invalide, rediriger vers login
            console.log('❌ Refresh token invalide, redirection vers login');
            localStorage.clear();
            router.replace('/?showLogin=true&message=Session expirée, veuillez vous reconnecter');
          }
        } else {
          // Erreur d'authentification
          console.log('❌ Erreur d\'authentification');
          localStorage.clear();
          router.replace('/?showLogin=true&message=Session invalide');
        }
      } catch (error) {
        console.error('❌ Erreur lors de la vérification du token:', error);
        setLoading(false);
      }
    };

    checkAuth();
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