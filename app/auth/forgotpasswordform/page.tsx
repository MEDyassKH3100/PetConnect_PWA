'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, ArrowLeft, CheckCircle, HeartPulse, AlertCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erreur lors de l\'envoi du code');
            }

            console.log('✅ Réponse API:', data);

            // En développement, afficher l'OTP dans la console
            if (data.otp) {
                console.log('📧 OTP reçu:', data.otp);
            }

            setLoading(false);
            setSubmitted(true);

            // Redirect to OTP verification after 2 seconds
            setTimeout(() => {
                router.push(`/auth/verifyotpform?email=${encodeURIComponent(email)}`);
            }, 2000);
        } catch (err: any) {
            console.error('❌ Erreur:', err);
            setError(err.message || 'Une erreur est survenue');
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F5DC] via-[#FFB8C2]/30 to-[#FF9A3D]/20 px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FFB8C2]/20 to-[#FF9A3D]/20 rounded-full mb-4">
                                <CheckCircle size={32} className="text-[#FF9A3D]" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                Email envoyé !
                            </h1>
                            <p className="text-gray-600 mb-6">
                                Nous avons envoyé un code de vérification à{' '}
                                <span className="font-medium text-[#FF9A3D]">{email}</span>
                            </p>
                            <p className="text-sm text-gray-500 mb-6">
                                Vous allez être redirigé automatiquement...
                            </p>
                            <Link
                                href="/auth/verifyotpform"
                                className="text-[#FF9A3D] hover:text-[#FFB8C2] font-medium transition-colors"
                            >
                                Continuer maintenant →
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
                    {/* Back to Login */}
                    <Link
                        href="/auth/login"
                        className="inline-flex items-center text-sm text-gray-600 hover:text-[#FF9A3D] mb-6 transition-colors"
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        Retour à la connexion
                    </Link>

                    <div className="text-center mb-6">
                        <Link href="/" className="inline-flex items-center justify-center mb-4">
                            <div className="bg-gradient-to-r from-[#FFB8C2] to-[#FF9A3D] rounded-full p-3">
                                <HeartPulse size={32} className="text-white" />
                            </div>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">
                            Mot de passe oublié ?
                        </h1>
                        <p className="text-gray-600">
                            Entrez votre email et nous vous enverrons un code de réinitialisation
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

                        {/* Email Input */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Adresse email
                            </label>
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2] focus:border-[#FFB8C2]"
                                    placeholder="votre@email.com"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#FFB8C2] to-[#FF9A3D] hover:from-[#FF9A3D] hover:to-[#FFB8C2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFB8C2] transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''
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
                                'Envoyer le code'
                            )}
                        </button>
                    </form>

                    {/* Info Text */}
                    <p className="mt-6 text-center text-sm text-gray-500">
                        Vous allez recevoir un code de vérification à 6 chiffres par email
                    </p>
                </div>
            </div>
        </div>
    );
}