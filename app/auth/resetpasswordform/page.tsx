'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Eye, EyeOff, CheckCircle, Check, X, HeartPulse, AlertCircle } from 'lucide-react';

// Composant qui utilise useSearchParams
function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token') || '';
    const email = searchParams.get('email') || '';

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            console.log('🔐 Réinitialisation mot de passe...');
            console.log('🆔 Token:', token);
            console.log('📧 Email:', email);

            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    password: formData.password,
                }),
            });

            const data = await response.json();
            console.log('📊 Réponse API:', data);

            if (!response.ok) {
                throw new Error(data.error || 'Erreur lors de la réinitialisation');
            }

            console.log('✅ Mot de passe réinitialisé avec succès!');
            setLoading(false);
            setSuccess(true);

            // Redirect to login after success
            setTimeout(() => {
                router.push('/auth/login');
            }, 2000);
        } catch (err: any) {
            console.error('❌ Erreur réinitialisation:', err);
            setError(err.message || 'Une erreur est survenue');
            setLoading(false);
        }
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

    const passwordsMatch = () => {
        return (
            formData.password === formData.confirmPassword && formData.password !== ''
        );
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F5DC] via-[#FFB8C2]/30 to-[#FF9A3D]/20 px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FFB8C2]/20 to-[#FF9A3D]/20 rounded-full mb-4">
                                <CheckCircle size={32} className="text-[#FF9A3D]" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                Mot de passe réinitialisé !
                            </h1>
                            <p className="text-gray-600 mb-6">
                                Votre mot de passe a été mis à jour avec succès
                            </p>
                            <p className="text-sm text-gray-500 mb-6">
                                Vous allez être redirigé vers la page de connexion...
                            </p>
                            <Link
                                href="/auth/login"
                                className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-[#FFB8C2] to-[#FF9A3D] text-white rounded-md hover:from-[#FF9A3D] hover:to-[#FFB8C2] transition-all shadow-md"
                            >
                                Se connecter maintenant
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">
                            Nouveau mot de passe
                        </h1>
                        <p className="text-gray-600">
                            Choisissez un mot de passe sécurisé pour votre compte
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start">
                                <AlertCircle size={18} className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Nouveau mot de passe
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

                            {/* Password Strength */}
                            {formData.password && (
                                <div className="mt-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                            <div
                                                className={`h-2 rounded-full ${strengthColor()}`}
                                                style={{
                                                    width: `${passwordStrength() * 25}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-500">{strengthLabel()}</span>
                                    </div>
                                    <ul className="text-xs text-gray-500 space-y-1 mt-2">
                                        <li className="flex items-center">
                                            {formData.password.length >= 8 ? (
                                                <Check size={12} className="text-green-500 mr-1" />
                                            ) : (
                                                <span className="text-gray-400 mr-1">•</span>
                                            )}
                                            Au moins 8 caractères
                                        </li>
                                        <li className="flex items-center">
                                            {/[A-Z]/.test(formData.password) ? (
                                                <Check size={12} className="text-green-500 mr-1" />
                                            ) : (
                                                <span className="text-gray-400 mr-1">•</span>
                                            )}
                                            Au moins une majuscule
                                        </li>
                                        <li className="flex items-center">
                                            {/[0-9]/.test(formData.password) ? (
                                                <Check size={12} className="text-green-500 mr-1" />
                                            ) : (
                                                <span className="text-gray-400 mr-1">•</span>
                                            )}
                                            Au moins un chiffre
                                        </li>
                                        <li className="flex items-center">
                                            {/[^A-Za-z0-9]/.test(formData.password) ? (
                                                <Check size={12} className="text-green-500 mr-1" />
                                            ) : (
                                                <span className="text-gray-400 mr-1">•</span>
                                            )}
                                            Au moins un caractère spécial
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || !passwordsMatch() || passwordStrength() < 2}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#FFB8C2] to-[#FF9A3D] hover:from-[#FF9A3D] hover:to-[#FFB8C2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFB8C2] transition-all ${loading || !passwordsMatch() || passwordStrength() < 2
                                ? 'opacity-70 cursor-not-allowed'
                                : ''
                                }`}
                        >
                            {loading ? (
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
                                'Réinitialiser le mot de passe'
                            )}
                        </button>
                    </form>

                    {/* Back to Login */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        <Link
                            href="/auth/login"
                            className="font-medium text-[#FF9A3D] hover:text-[#FFB8C2] transition-colors"
                        >
                            Retour à la connexion
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

// Composant Loading pour Suspense
function LoadingFallback() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F5DC] via-[#FFB8C2]/30 to-[#FF9A3D]/20 px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9A3D] mx-auto mb-4"></div>
                        <p className="text-gray-600">Chargement...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Composant principal avec Suspense
export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <ResetPasswordForm />
        </Suspense>
    );
}