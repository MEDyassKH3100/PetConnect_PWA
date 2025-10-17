'use client';

import { useState } from 'react';
import { LockClosedIcon, ShieldCheckIcon, CheckCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

const ResetPasswordForm = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
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
        return formData.password === formData.confirmPassword && formData.password !== '';
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (formData.password.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères');
            return;
        }
        if (!passwordsMatch()) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1500);
    };

    if (success) {
        return (
            <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mb-4">
                        <CheckCircleIcon className="w-6 h-6 text-green-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Mot de passe réinitialisé</h1>
                    <p className="text-gray-600 mt-3">
                        Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
                    </p>
                </div>
                <div className="mt-6">
                    <a href="/login" className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] hover:from-[#FFB8C2] hover:to-[#F5F5DC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFB8C2]">
                        Se connecter
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
            <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mb-4">
                    <div className="bg-gradient-to-r from-[#3D9EFF] to-[#FF9A3D] rounded-full p-3">
                        <ShieldCheckIcon className="w-6 h-6 text-white" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Réinitialiser le mot de passe</h1>
                <p className="text-gray-600 mt-1">Créez un nouveau mot de passe sécurisé</p>
            </div>
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Nouveau mot de passe
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <LockClosedIcon className="w-4 h-4 text-gray-400" />
                        </div>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-10 pr-10 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2] focus:border-[#FFB8C2] text-black"
                            placeholder="••••••••"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                                {showPassword ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    {formData.password && (
                        <div className="mt-2">
                            <div className="flex items-center justify-between mb-1">
                                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                    <div className={`h-2 rounded-full ${strengthColor()}`} style={{ width: `${passwordStrength() * 25}%` }}></div>
                                </div>
                                <span className="text-xs text-gray-500">{strengthLabel()}</span>
                            </div>
                            <ul className="text-xs text-gray-500 space-y-1 mt-2">
                                <li className="flex items-center">
                                    <span className={`mr-1 ${formData.password.length >= 8 ? 'text-green-500' : 'text-gray-400'}`}>
                                        {formData.password.length >= 8 ? <CheckCircleIcon className="w-4 h-4" /> : '•'}
                                    </span>
                                    Au moins 8 caractères
                                </li>
                                <li className="flex items-center">
                                    <span className={`mr-1 ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-gray-400'}`}>
                                        {/[A-Z]/.test(formData.password) ? <CheckCircleIcon className="w-4 h-4" /> : '•'}
                                    </span>
                                    Au moins une majuscule
                                </li>
                                <li className="flex items-center">
                                    <span className={`mr-1 ${/[0-9]/.test(formData.password) ? 'text-green-500' : 'text-gray-400'}`}>
                                        {/[0-9]/.test(formData.password) ? <CheckCircleIcon className="w-4 h-4" /> : '•'}
                                    </span>
                                    Au moins un chiffre
                                </li>
                                <li className="flex items-center">
                                    <span className={`mr-1 ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-500' : 'text-gray-400'}`}>
                                        {/[^A-Za-z0-9]/.test(formData.password) ? <CheckCircleIcon className="w-4 h-4" /> : '•'}
                                    </span>
                                    Au moins un caractère spécial
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirmer le mot de passe
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <LockClosedIcon className="w-4 h-4 text-gray-400" />
                        </div>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 ${formData.confirmPassword ? (passwordsMatch() ? 'border-green-300 focus:ring-green-500 focus:border-green-500' : 'border-red-300 focus:ring-red-500 focus:border-red-500') : 'border-black focus:ring-[#FFB8C2] focus:border-[#FFB8C2]'} text-black`}
                            placeholder="••••••••"
                        />
                        {formData.confirmPassword && (
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                {passwordsMatch() ? <CheckCircleIcon className="w-4 h-4 text-green-500" /> : <EyeSlashIcon className="w-4 h-4 text-red-500" />}
                            </div>
                        )}
                    </div>
                    {formData.confirmPassword && !passwordsMatch() && (
                        <p className="mt-1 text-xs text-red-500">Les mots de passe ne correspondent pas</p>
                    )}
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={loading || !passwordsMatch() || formData.password.length < 8}
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] hover:from-[#FFB8C2] hover:to-[#F5F5DC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFB8C2] ${loading || !passwordsMatch() || formData.password.length < 8 ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            'Réinitialiser le mot de passe'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ResetPasswordForm;