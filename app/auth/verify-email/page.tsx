'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { HeartPulse, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function VerifyEmailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get('token');

            if (!token) {
                setStatus('error');
                setMessage('Token de vérification manquant');
                return;
            }

            try {
                const response = await fetch(`/api/auth/verify-email?token=${token}`);
                const data = await response.json();

                if (response.ok) {
                    setStatus('success');
                    setMessage(data.message);
                    // Rediriger vers la page de connexion après 3 secondes
                    setTimeout(() => {
                        router.push('/auth/login');
                    }, 3000);
                } else {
                    setStatus('error');
                    setMessage(data.error || 'Erreur lors de la vérification');
                }
            } catch (error) {
                setStatus('error');
                setMessage('Erreur de connexion au serveur');
            }
        };

        verifyEmail();
    }, [searchParams, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F5DC] via-white to-[#FFB8C2] p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <div className="bg-gradient-to-r from-[#FF9A3D] to-[#FFB8C2] p-4 rounded-full">
                            <HeartPulse className="h-12 w-12 text-white" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#FF9A3D] to-[#FFB8C2] bg-clip-text text-transparent">
                        PetConnect
                    </h1>

                    {status === 'loading' && (
                        <>
                            <Loader2 className="h-16 w-16 text-[#FF9A3D] animate-spin mx-auto mb-4" />
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Vérification en cours...
                            </h2>
                            <p className="text-gray-600">
                                Veuillez patienter pendant que nous vérifions votre email.
                            </p>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Email vérifié avec succès !
                            </h2>
                            <p className="text-gray-600 mb-6">
                                {message}
                            </p>
                            <p className="text-sm text-gray-500">
                                Redirection vers la page de connexion...
                            </p>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Erreur de vérification
                            </h2>
                            <p className="text-gray-600 mb-6">
                                {message}
                            </p>
                            <Link
                                href="/auth/login"
                                className="inline-block bg-gradient-to-r from-[#FF9A3D] to-[#FFB8C2] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                            >
                                Retour à la connexion
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}