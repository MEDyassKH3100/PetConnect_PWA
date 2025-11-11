'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, User, Lock, HeartPulse } from 'lucide-react';
import { loginUser, logout } from '@/store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/slices/hooks';

<<<<<<< Updated upstream
interface LoginProps {
    onSwitchToRegister: () => void;
    onOpenForgotPassword: () => void;
}

const Login = ({ onSwitchToRegister, onOpenForgotPassword }: LoginProps) => {
=======
export default function LoginPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);
>>>>>>> Stashed changes
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    // Redirection uniquement après une connexion réussie
    useEffect(() => {
        if (isAuthenticated && shouldRedirect) {
            router.push('/home');
        }
    }, [isAuthenticated, shouldRedirect, router]);

<<<<<<< Updated upstream
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Erreur lors de la connexion');

    if (data.token) {
      // ✅ Store the token
      localStorage.setItem('token', data.token);
    }

    router.push('/home'); // navigate to HomePage
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


    return (
        <div
            className="fixed inset-0 bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url('/images/home.jpg')" }}
        >
            <div className="w-full max-w-md p-6 sm:p-8 bg-black/20 backdrop-blur-md rounded-lg shadow-md">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mb-4">
                        <div className="bg-gradient-to-r from-[#3D9EFF] to-[#FF9A3D] rounded-full p-2 overflow-hidden">
                            <Image src="/images/logo.png" alt="Logo" width={35} height={35} className="object-contain" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white">Connexion</h1>
                    <p className="text-white/80 mt-1">Accédez à votre espace PetCareVerse</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserIcon className="w-6 h-6 text-white/70" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-white rounded-md bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#FFB8C2] focus:border-[#FFB8C2]"
                                placeholder="votre@email.com"
                            />
=======
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await dispatch(loginUser({ email, password })).unwrap();
            // Activer la redirection après une connexion réussie
            setShouldRedirect(true);
        } catch (err: any) {
            console.error('❌ Erreur de connexion:', err);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F5DC] via-[#FFB8C2]/30 to-[#FF9A3D]/20 px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <div className="text-center mb-6">
                        <Link href="/" className="inline-flex items-center justify-center mb-4">
                            <div className="bg-gradient-to-r from-[#FFB8C2] to-[#FF9A3D] rounded-full p-3">
                                <HeartPulse size={32} className="text-white" />
                            </div>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">Connexion</h1>
                        <p className="text-gray-600 mt-1">Accédez à votre espace PetCareVerse</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                            {error}
>>>>>>> Stashed changes
                        </div>
                    )}

<<<<<<< Updated upstream
                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white mb-1">Mot de passe</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockClosedIcon className="w-6 h-6 text-white/70" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-2 border border-white rounded-md bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#FFB8C2] focus:border-[#FFB8C2]"
                                placeholder="••••••••"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white/70 hover:text-white focus:outline-none">
                                    {showPassword ? <EyeSlashIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                                </button>
=======
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User size={18} className="text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2] focus:border-[#FFB8C2]"
                                    placeholder="votre@email.com"
                                />
>>>>>>> Stashed changes
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2] focus:border-[#FFB8C2]"
                                    placeholder="••••••••"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 text-[#FFB8C2] focus:ring-[#FFB8C2] border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Se souvenir de moi
                                </label>
                            </div>
                            <Link href="/auth/forgotpasswordform" className="text-sm font-medium text-[#FF9A3D] hover:text-[#FFB8C2]">
                                Mot de passe oublié ?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#FFB8C2] to-[#FF9A3D] hover:from-[#FF9A3D] hover:to-[#FFB8C2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFB8C2] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : 'Se connecter'}
                        </button>
                    </form>

                    {/* Social Login */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button type="button" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                            </button>
                            <button type="button" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V19c0 .27.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0010 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>

<<<<<<< Updated upstream
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 border border-transparent rounded-md text-black bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] hover:from-[#FFB8C2] hover:to-[#F5F5DC] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Chargement...' : 'Se connecter'}
                    </button>
                </form>

                <p className="mt-6 text-center text-white/80">
                    Pas encore de compte ? <button onClick={onSwitchToRegister} className="font-medium text-[#FFB8C2] hover:text-white transition-colors bg-transparent border-none cursor-pointer">Créer un compte</button>
                </p>
=======
                    {/* Register Link */}
                    <p className="mt-8 text-center text-sm text-gray-600">
                        Pas encore de compte ?{' '}
                        <Link href="/auth/register" className="font-medium text-[#FF9A3D] hover:text-[#FFB8C2]">
                            Créer un compte
                        </Link>
                    </p>
                </div>
>>>>>>> Stashed changes
            </div>
        </div>
    );
}
