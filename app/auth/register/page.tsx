'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, Check, X, HeartPulse } from 'lucide-react';
import { registerUser, logout } from '@/store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/slices/hooks';
import { GoogleSignInButton } from '../google/GoogleSignInButton';

export default function RegisterPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);


    // Redirection vers login après inscription réussie
    useEffect(() => {
        if (isAuthenticated && shouldRedirect) {
            // Déconnecter l'utilisateur après inscription pour qu'il se connecte manuellement
            dispatch(logout());
            // Rediriger vers la page de login
            setTimeout(() => {
                router.push('/auth/login');
            }, 500);
        }
    }, [isAuthenticated, shouldRedirect, router, dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const passwordStrength = () => {
        const { password } = formData;
        if (!password) return 0;
        let score = 0;
        if (password.length >= 8) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;
        return score;
    };

    const strengthLabel = () => {
        const strength = passwordStrength();
        if (strength === 0) return '';
        if (strength === 1) return 'Faible';
        if (strength === 2) return 'Moyen';
        if (strength === 3) return 'Bon';
        return 'Excellent';
    };

    const strengthColor = () => {
        const strength = passwordStrength();
        if (strength === 0) return 'bg-gray-200';
        if (strength === 1) return 'bg-red-500';
        if (strength === 2) return 'bg-orange-500';
        if (strength === 3) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const passwordsMatch = () => formData.password === formData.confirmPassword && formData.password !== '';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Vérifier que les conditions sont acceptées
        if (!termsAccepted) {
            alert('Veuillez accepter les conditions d\'utilisation et la politique de confidentialité');
            return;
        }

        if (!passwordsMatch()) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }

        try {
            console.log('📝 Inscription en cours...');
            await dispatch(registerUser({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
            })).unwrap();

            console.log('✅ Inscription réussie! Redirection vers login...');
            // Afficher le message de succès
            setRegistrationSuccess(true);
            // Activer la redirection après une inscription réussie
            setShouldRedirect(true);
        } catch (err: any) {
            console.error('❌ Erreur d\'inscription:', err);
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
                        <h1 className="text-2xl font-bold text-gray-800">Créer un compte</h1>
                        <p className="text-gray-600 mt-1">Rejoignez PetCareVerse dès aujourd'hui</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                            {error}
                        </div>
                    )}
                    {registrationSuccess && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm flex items-center">
                            <Check size={18} className="mr-2 flex-shrink-0" />
                            <span>
                                Inscription réussie ! Redirection vers la page de connexion...
                            </span>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* First & Last Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Prénom
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2] focus:border-[#FFB8C2]"
                                    placeholder="Sophie"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nom
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2] focus:border-[#FFB8C2]"
                                    placeholder="Martin"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail size={18} className="text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2] focus:border-[#FFB8C2]"
                                    placeholder="votre@email.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Mot de passe
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
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

                            {/* Password requirements */}
                            {formData.password && (
                                <div className="mt-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                            <div
                                                className={`h-2 rounded-full ${strengthColor()}`}
                                                style={{ width: `${passwordStrength() * 25}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-500">{strengthLabel()}</span>
                                    </div>
                                    <ul className="text-xs text-gray-500 space-y-1 mt-2">
                                        <li className="flex items-center">
                                            <span className={`mr-1 ${formData.password.length >= 8 ? 'text-green-500' : 'text-gray-400'}`}>
                                                {formData.password.length >= 8 ? <Check size={12} /> : '•'}
                                            </span>
                                            Au moins 8 caractères
                                        </li>
                                        <li className="flex items-center">
                                            <span className={`mr-1 ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-gray-400'}`}>
                                                {/[A-Z]/.test(formData.password) ? <Check size={12} /> : '•'}
                                            </span>
                                            Au moins une majuscule
                                        </li>
                                        <li className="flex items-center">
                                            <span className={`mr-1 ${/[0-9]/.test(formData.password) ? 'text-green-500' : 'text-gray-400'}`}>
                                                {/[0-9]/.test(formData.password) ? <Check size={12} /> : '•'}
                                            </span>
                                            Au moins un chiffre
                                        </li>
                                        <li className="flex items-center">
                                            <span className={`mr-1 ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-500' : 'text-gray-400'}`}>
                                                {/[^A-Za-z0-9]/.test(formData.password) ? <Check size={12} /> : '•'}
                                            </span>
                                            Au moins un caractère spécial
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirmer le mot de passe
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-gray-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 ${formData.confirmPassword
                                        ? passwordsMatch()
                                            ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
                                            : 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                        : 'border-gray-300 focus:ring-[#FFB8C2] focus:border-[#FFB8C2]'
                                        }`}
                                    placeholder="••••••••"
                                />
                                {formData.confirmPassword && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        {passwordsMatch() ? (
                                            <Check size={18} className="text-green-500" />
                                        ) : (
                                            <X size={18} className="text-red-500" />
                                        )}
                                    </div>
                                )}
                            </div>
                            {formData.confirmPassword && !passwordsMatch() && (
                                <p className="mt-1 text-xs text-red-500">
                                    Les mots de passe ne correspondent pas
                                </p>
                            )}
                        </div>

                        {/* Terms & Conditions */}
                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                required
                                className="h-4 w-4 text-[#FFB8C2] focus:ring-[#FFB8C2] border-gray-300 rounded"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                J'accepte les{' '}
                                <Link href="#" className="font-medium text-[#FF9A3D] hover:text-[#FFB8C2]">
                                    conditions d'utilisation
                                </Link>{' '}
                                et la{' '}
                                <Link href="#" className="font-medium text-[#FF9A3D] hover:text-[#FFB8C2]">
                                    politique de confidentialité
                                </Link>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !passwordsMatch() || !termsAccepted}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#FFB8C2] to-[#FF9A3D] hover:from-[#FF9A3D] hover:to-[#FFB8C2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFB8C2] ${isLoading || !passwordsMatch() || !termsAccepted
                                ? 'opacity-70 cursor-not-allowed'
                                : ''
                                }`}
                        >
                            {isLoading ? (
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            ) : (
                                'Créer mon compte'
                            )}
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

                    {/* Login Link */}
                    <p className="mt-8 text-center text-sm text-gray-600">
                        Déjà un compte ?{' '}
                        <Link href="/auth/login" className="font-medium text-[#FF9A3D] hover:text-[#FFB8C2]">
                            Se connecter
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}