'use client';

import { useState } from 'react';
import Image from 'next/image';
import { UserIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

interface LoginProps {
    onSwitchToRegister: () => void;
    onOpenForgotPassword: () => void;
    onLoginSuccess?: () => void;
}

const Login = ({ onSwitchToRegister, onOpenForgotPassword, onLoginSuccess }: LoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

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
    // ✅ Stocker le token et les informations utilisateur
    localStorage.setItem('token', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));

    const maxAge = rememberMe ? 7 * 24 * 60 * 60 : 24 * 60 * 60;
    document.cookie = `token=${data.token}; path=/; max-age=${maxAge}`;

    console.log('✅ Connexion réussie, token JWT généré');
    console.log('🍪 Token stocké dans cookies:', document.cookie.includes('token'));

    // ✅ Appeler le callback si fourni
    if (onLoginSuccess) {
        onLoginSuccess();
    }

    // ✅ Rediriger uniquement si le login est réussi
    setTimeout(() => {
        router.push('/home');
    }, 100);
}
} catch (err: any) {
            console.error('❌ Erreur de connexion:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full max-w-md p-6 sm:p-8 bg-transparent rounded-lg">
            <div className="w-full"> <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mb-4">
                    <div className="bg-gradient-to-r from-[#3D9EFF] to-[#FF9A3D] rounded-full p-2 overflow-hidden">
                        <Image src="/images/logo.png" alt="Logo" width={35} height={35} className="object-contain" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Connexion</h1>
                <p className="text-gray-600 mt-1">Accédez à votre espace PetCareVerse</p></div>

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
                                <UserIcon className="w-6 h-6 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB8C2] focus:border-[#FFB8C2]"
                                placeholder="votre@email.com"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockClosedIcon className="w-6 h-6 text-gray-400" />
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
                            </div>
                        </div>
                    </div>

                    {/* Remember & Forgot */}
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
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-white/80">Se souvenir de moi</label>
                        </div>
                        <div className="text-sm">
                            <button
                                onClick={onOpenForgotPassword}
                                className="font-medium text-[#FFB8C2] hover:text-white transition-colors bg-transparent border-none cursor-pointer"
                            >
                                Mot de passe oublié ?
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 border border-transparent rounded-md text-black bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] hover:from-[#FFB8C2] hover:to-[#F5F5DC] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Chargement...' : 'Se connecter'}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-700">
                    Pas encore de compte ? <button onClick={onSwitchToRegister} className="font-medium text-[#FFB8C2] hover:text-[#FF9A3D] transition-colors bg-transparent border-none cursor-pointer">Créer un compte</button>
                </p>
            </div>
        </div>
    );
};

export default Login;
