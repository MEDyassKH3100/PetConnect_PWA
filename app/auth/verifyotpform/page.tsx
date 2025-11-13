'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Key, ArrowLeft, HeartPulse } from 'lucide-react';

// Composant qui utilise useSearchParams
function VerifyOTPContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendTimer, setResendTimer] = useState(60);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Countdown timer for resend
    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return; // Only allow single digit

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        const newOtp = pastedData.split('');
        setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')]);

        // Focus the last filled input
        const lastIndex = Math.min(newOtp.length - 1, 5);
        inputRefs.current[lastIndex]?.focus();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join('');

        if (otpCode.length !== 6) {
            setError('Veuillez entrer le code complet à 6 chiffres');
            return;
        }

        setLoading(true);
        setError('');

        try {
            console.log('🔍 Vérification OTP:', otpCode, 'pour', email);

            const response = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    otp: otpCode
                }),
            });

            const data = await response.json();
            console.log('📊 Réponse API:', data);

            if (!response.ok) {
                throw new Error(data.error || 'Code incorrect');
            }

            // Redirection vers reset password avec le token
            if (data.resetToken) {
                console.log('✅ OTP validé, redirection...');
                router.push(`/auth/resetpasswordform?token=${data.resetToken}&email=${encodeURIComponent(email)}`);
            } else {
                throw new Error('Token de réinitialisation manquant');
            }
        } catch (err: any) {
            console.error('❌ Erreur vérification OTP:', err);
            setError(err.message || 'Code incorrect. Veuillez réessayer.');
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (resendTimer === 0) {
            try {
                console.log('🔄 Renvoi du code OTP...');

                const response = await fetch('/api/auth/forgot-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();

                if (response.ok) {
                    setResendTimer(60);
                    setError('');
                    console.log('✅ Code renvoyé avec succès');

                    // En développement, afficher l'OTP
                    if (data.otp) {
                        console.log('📧 Nouveau OTP:', data.otp);
                    }
                } else {
                    setError('Erreur lors du renvoi du code');
                }
            } catch (err) {
                console.error('❌ Erreur renvoi OTP:', err);
                setError('Erreur lors du renvoi du code');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F5DC] via-[#FFB8C2]/30 to-[#FF9A3D]/20 px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    {/* Back Button */}
                    <Link
                        href="/auth/forgotpasswordform"
                        className="inline-flex items-center text-sm text-gray-600 hover:text-[#FF9A3D] mb-6 transition-colors"
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        Retour
                    </Link>

                    <div className="text-center mb-6">
                        <Link href="/" className="inline-flex items-center justify-center mb-4">
                            <div className="bg-gradient-to-r from-[#FFB8C2] to-[#FF9A3D] rounded-full p-3">
                                <HeartPulse size={32} className="text-white" />
                            </div>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">
                            Vérification du code
                        </h1>
                        <p className="text-gray-600">
                            Entrez le code à 6 chiffres envoyé à
                        </p>
                        {email && (
                            <p className="font-medium text-[#FF9A3D] mt-1">{email}</p>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* OTP Input */}
                        <div>
                            <div className="flex justify-center gap-2 mb-2">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => {
                                            inputRefs.current[index] = el;
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={index === 0 ? handlePaste : undefined}
                                        className={`w-12 h-14 text-center text-xl font-semibold border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${error
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:border-[#FFB8C2] focus:ring-[#FFB8C2]'
                                            }`}
                                        autoFocus={index === 0}
                                    />
                                ))}
                            </div>
                            {error && (
                                <p className="text-sm text-red-500 text-center mt-2">{error}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || otp.join('').length !== 6}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#FFB8C2] to-[#FF9A3D] hover:from-[#FF9A3D] hover:to-[#FFB8C2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFB8C2] transition-all ${loading || otp.join('').length !== 6
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
                                'Vérifier le code'
                            )}
                        </button>
                    </form>

                    {/* Resend Code */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Vous n&apos;avez pas reçu le code ?{' '}
                            {resendTimer > 0 ? (
                                <span className="text-gray-400">
                                    Renvoyer dans {resendTimer}s
                                </span>
                            ) : (
                                <button
                                    onClick={handleResend}
                                    className="font-medium text-[#FF9A3D] hover:text-[#FFB8C2] transition-colors"
                                >
                                    Renvoyer le code
                                </button>
                            )}
                        </p>
                    </div>

                    {/* Help Text */}
                    <p className="mt-4 text-center text-xs text-gray-500">
                        Vérifiez vos spams si vous ne trouvez pas l&apos;email
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
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center mb-4">
                            <div className="bg-gradient-to-r from-[#FFB8C2] to-[#FF9A3D] rounded-full p-3">
                                <HeartPulse size={32} className="text-white" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">
                            Vérification du code
                        </h1>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9A3D] mx-auto mb-4"></div>
                        <p className="text-gray-600">Chargement...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Composant principal avec Suspense
export default function VerifyOTPPage() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <VerifyOTPContent />
        </Suspense>
    );
}