'use client';

import { useState } from 'react';
import Image from 'next/image';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

const Register = ({ onSwitchToLogin }: { onSwitchToLogin: () => void }) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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

    const passwordsMatch = () => formData.password === formData.confirmPassword && formData.password !== '';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!passwordsMatch() || !termsAccepted) return;
        setLoading(true);
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Erreur lors de l\'inscription');
            router.push('/?showLogin=true&message=Inscription réussie, veuillez vous connecter');
        } catch (err: any) {
            setError(err.message || 'Erreur lors de l\'inscription');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-cover bg-center flex items-center justify-center"
             style={{ backgroundImage: "url('/images/home.jpg')" }}>
            <div className="w-full max-w-md p-6 sm:p-8 bg-black/20 backdrop-blur-md rounded-lg shadow-md">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mb-4">
                        <div className="bg-gradient-to-r from-[#3D9EFF] to-[#FF9A3D] rounded-full p-2 overflow-hidden">
                            <Image src="/images/logo.png" alt="Logo" width={35} height={35} className="object-contain" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white">Créer un compte</h1>
                    <p className="text-white/80 mt-1">Rejoignez PetCareVerse dès aujourd'hui</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* First & Last Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['firstName', 'lastName'].map((field, idx) => (
                            <div key={idx}>
                                <label htmlFor={field} className="block text-sm font-medium text-white mb-1">
                                    {field === 'firstName' ? 'Prénom' : 'Nom'}
                                </label>
                                <input
                                    id={field}
                                    name={field}
                                    type="text"
                                    required
                                    value={formData[field as keyof typeof formData]}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-white rounded-md bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#FFB8C2] focus:border-[#FFB8C2]"
                                    placeholder={field === 'firstName' ? 'Sophie' : 'Martin'}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <EnvelopeIcon className="w-6 h-6 text-white/70" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-3 py-2 border border-white rounded-md bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#FFB8C2] focus:border-[#FFB8C2]"
                                placeholder="votre@email.com"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    {['password', 'confirmPassword'].map((field, idx) => (
                        <div key={idx}>
                            <label htmlFor={field} className="block text-sm font-medium text-white mb-1">
                                {field === 'password' ? 'Mot de passe' : 'Confirmer le mot de passe'}
                            </label>
                            <div className="relative">
                                {field === 'password' && (
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LockClosedIcon className="w-6 h-6 text-white/70" />
                                    </div>
                                )}
                                <input
                                    id={field}
                                    name={field}
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData[field as keyof typeof formData]}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border border-white rounded-md bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#FFB8C2] focus:border-[#FFB8C2] ${field === 'password' ? 'pl-10 pr-10' : 'pr-3'}`}
                                    placeholder="••••••••"
                                />
                                {field === 'password' && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white/70 hover:text-white focus:outline-none">
                                            {showPassword ? <EyeSlashIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                                        </button>
                                    </div>
                                )}
                                {field === 'confirmPassword' && formData.confirmPassword && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        {passwordsMatch() ? <CheckIcon className="w-6 h-6 text-green-500" /> : <XMarkIcon className="w-6 h-6 text-red-500" />}
                                    </div>
                                )}
                            </div>

                            {/* Password requirements */}
                            {field === 'password' && formData.password && (
                                <div className="mt-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                            <div className={`h-2 rounded-full ${passwordStrength() === 0 ? 'bg-gray-200' : passwordStrength() === 1 ? 'bg-red-500' : passwordStrength() === 2 ? 'bg-orange-500' : passwordStrength() === 3 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${passwordStrength() * 25}%` }}></div>
                                        </div>
                                        <span className="text-xs text-white/80">{passwordStrength() === 0 ? '' : passwordStrength() === 1 ? 'Faible' : passwordStrength() === 2 ? 'Moyen' : passwordStrength() === 3 ? 'Bon' : 'Excellent'}</span>
                                    </div>
                                    <ul className="text-xs text-white/80 space-y-1 mt-2">
                                        <li className="flex items-center">
                                            <span className={`mr-1 ${formData.password.length >= 8 ? 'text-green-500' : 'text-gray-400'}`}>
                                                {formData.password.length >= 8 ? <CheckIcon className="w-5 h-5" /> : '•'}
                                            </span>
                                            Au moins 8 caractères
                                        </li>
                                        <li className="flex items-center">
                                            <span className={`mr-1 ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-gray-400'}`}>
                                                {/[A-Z]/.test(formData.password) ? <CheckIcon className="w-5 h-5" /> : '•'}
                                            </span>
                                            Au moins une majuscule
                                        </li>
                                        <li className="flex items-center">
                                            <span className={`mr-1 ${/[0-9]/.test(formData.password) ? 'text-green-500' : 'text-gray-400'}`}>
                                                {/[0-9]/.test(formData.password) ? <CheckIcon className="w-5 h-5" /> : '•'}
                                            </span>
                                            Au moins un chiffre
                                        </li>
                                        <li className="flex items-center">
                                            <span className={`mr-1 ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-500' : 'text-gray-400'}`}>
                                                {/[^A-Za-z0-9]/.test(formData.password) ? <CheckIcon className="w-5 h-5" /> : '•'}
                                            </span>
                                            Au moins un caractère spécial
                                        </li>
                                    </ul>
                                </div>
                            )}

                            {field === 'confirmPassword' && formData.confirmPassword && !passwordsMatch() && (
                                <p className="mt-1 text-xs text-red-500">Les mots de passe ne correspondent pas</p>
                            )}
                        </div>
                    ))}

                    {/* Terms */}
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
                        <label htmlFor="terms" className="ml-2 block text-sm text-white/80">
                            J'accepte les <a href="#" className="font-medium text-[#FFB8C2] hover:text-white transition-colors">conditions d'utilisation</a> et la <a href="#" className="font-medium text-[#FFB8C2] hover:text-white transition-colors">politique de confidentialité</a>
                        </label>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading || !passwordsMatch() || !termsAccepted}
                        className={`w-full py-2 px-4 border border-transparent rounded-md text-black bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] hover:from-[#FFB8C2] hover:to-[#F5F5DC] ${loading || !passwordsMatch() || !termsAccepted ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Chargement...' : 'Créer mon compte'}
                    </button>
                </form>

                <p className="mt-6 text-center text-white/80">
                    Déjà un compte ? <button onClick={onSwitchToLogin} className="font-medium text-[#FFB8C2] hover:text-white transition-colors bg-transparent border-none cursor-pointer">Se connecter</button>
                </p>
            </div>
        </div>
    );
};

export default Register;
