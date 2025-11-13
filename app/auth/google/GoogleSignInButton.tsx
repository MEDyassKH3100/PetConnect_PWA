'use client';

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/slices/hooks';
import { setCredentials } from '@/store/slices/authSlice';
import { useEffect, useState } from 'react';


interface GoogleSignInButtonProps {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export const GoogleSignInButton = ({ onSuccess, onError }: GoogleSignInButtonProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [clientId, setClientId] = useState('');
    useEffect(() => {
        // Charger le client ID côté client uniquement
        const id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
        setClientId(id);
        console.log('🔑 Google Client ID:', id);
    }, []);
    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            console.log('✅ Google credential reçu');

            const response = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    credential: credentialResponse.credential,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erreur lors de la connexion Google');
            }

            console.log('✅ Authentification Google réussie:', data);

            dispatch(setCredentials({
                user: data.user,
                token: data.token,
                refreshToken: data.token, // Utiliser le même token comme refreshToken pour Google OAuth
            }));

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            if (onSuccess) {
                onSuccess();
            } else {
                router.push('/home');
            }
        } catch (error: any) {
            console.error('❌ Erreur Google Sign-In:', error);
            if (onError) {
                onError(error.message);
            }
        }
    };

    const handleGoogleError = () => {
        console.error('❌ Échec de la connexion Google');
        if (onError) {
            onError('Échec de la connexion Google');
        }
    };

    if (!clientId) {
        return (
            <div className="text-center text-sm text-gray-500">
                Chargement de Google Sign-In...
            </div>
        );
    }

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="w-full flex justify-center">
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    theme="outline"
                    size="large"
                    text="continue_with"
                    shape="rectangular"
                />
            </div>
        </GoogleOAuthProvider>
    );
};