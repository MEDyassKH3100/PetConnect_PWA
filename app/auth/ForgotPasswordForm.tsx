'use client';

import { useState } from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/solid';

interface ForgotPasswordFormProps {
    onOpenVerifyOTP: () => void;
    onOpenLogin: () => void;
}

const ForgotPasswordForm = ({ onOpenVerifyOTP, onOpenLogin }: ForgotPasswordFormProps) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setTimeout(() => {
            if (!email || !email.includes('@')) {
                setError('Veuillez entrer une adresse email valide');
                setLoading(false);
                return;
            }
            setLoading(false);
            onOpenVerifyOTP(); // Ouvrir la popup de vérification OTP après soumission
        }, 1500);
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
            <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mb-4">
                    <div className="bg-gradient-to-r from-[#3D9EFF] to-[#FF9A3D] rounded-full p-3">
                        <EnvelopeIcon className="w-6 h-6 text-white" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Mot de passe oublié</h1>
                <p className="text-gray-600 mt-1">Entrez votre adresse email pour recevoir un code de vérification</p>
            </div>
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                        </div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2] focus:border-[#FFB8C2] text-black"
                            placeholder="votre@email.com"
                        />
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] hover:from-[#FFB8C2] hover:to-[#F5F5DC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFB8C2] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            'Envoyer le code de vérification'
                        )}
                    </button>
                </div>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
                Vous vous souvenez de votre mot de passe ?{' '}
                <button
                    onClick={() => onOpenLogin()} // Ramène à la popup de login
                    className="font-medium text-[#FFB8C2] hover:text-[#F5F5DC] transition-colors bg-transparent border-none cursor-pointer"
                >
                    Se connecter
                </button>
            </p>
        </div>
    );
};

export default ForgotPasswordForm;