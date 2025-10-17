'use client';

import { useState, useRef, useEffect } from 'react';
import { KeyIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

interface VerifyOTPFormProps {
    onOpenResetPassword: () => void;
    onOpenLogin: () => void;
}

const VerifyOTPForm = ({ onOpenResetPassword, onOpenLogin }: VerifyOTPFormProps) => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [timeLeft, setTimeLeft] = useState(60);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        }
    }, [timeLeft]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (value.length > 1) {
            const pastedValue = value.slice(0, 6);
            const newOtp = [...otp];
            for (let i = 0; i < pastedValue.length; i++) {
                if (index + i < 6) {
                    newOtp[index + i] = pastedValue[i];
                }
            }
            setOtp(newOtp);
            const nextIndex = Math.min(index + pastedValue.length, 5);
            inputRefs.current[nextIndex]?.focus();
        } else if (/^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value !== '' && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const otpValue = otp.join('');
        if (otpValue.length !== 6) {
            setError('Veuillez entrer le code complet à 6 chiffres');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onOpenResetPassword();
        }, 1500);
    };

    const resendOTP = () => {
        setTimeLeft(60);
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
            <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] rounded-full mb-4">
                    <div className="bg-gradient-to-r from-[#3D9EFF] to-[#FF9A3D] rounded-full p-3">
                        <KeyIcon className="w-6 h-6 text-white" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Vérification</h1>
                <p className="text-gray-600 mt-1">Entrez le code à 6 chiffres envoyé à votre adresse email</p>
            </div>
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-3">
                        Code de vérification
                    </label>
                    <div className="flex justify-between gap-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => { inputRefs.current[index] = el; }}
                                type="text"
                                maxLength={6}
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-full h-12 text-center text-lg font-semibold text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB8C2] focus:border-[#FFB8C2]"
                                autoFocus={index === 0}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        type="button"
                        disabled={timeLeft > 0}
                        onClick={resendOTP}
                        className={`text-sm font-medium ${timeLeft > 0 ? 'text-gray-400' : 'text-[#FFB8C2] hover:text-[#F5F5DC]'}`}
                    >
                        {timeLeft > 0 ? `Renvoyer le code (${timeLeft}s)` : 'Renvoyer le code'}
                    </button>
                </div>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => onOpenLogin()}
                        className="w-1/4 flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFB8C2]"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                    </button>
                    <button
                        type="submit"
                        disabled={loading || otp.join('').length !== 6}
                        className={`w-3/4 flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] hover:from-[#FFB8C2] hover:to-[#F5F5DC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFB8C2] ${loading || otp.join('').length !== 6 ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <>
                                <span>Vérifier</span>
                                <ArrowRightIcon className="w-4 h-4 ml-2" />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VerifyOTPForm;