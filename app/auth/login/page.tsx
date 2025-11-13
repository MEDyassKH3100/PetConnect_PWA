'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, User, Lock, HeartPulse } from 'lucide-react';
import { loginUser, logout } from '@/store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/slices/hooks';
import { GoogleSignInButton } from '../google/GoogleSignInButton';

export default function LoginPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);
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
                        </div>
                    )}

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

                        <div className="mt-6">
                            <GoogleSignInButton />
                        </div>
                    </div>

                    {/* Register Link */}
                    <p className="mt-8 text-center text-sm text-gray-600">
                        Pas encore de compte ?{' '}
                        <Link href="/auth/register" className="font-medium text-[#FF9A3D] hover:text-[#FFB8C2]">
                            Créer un compte
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
