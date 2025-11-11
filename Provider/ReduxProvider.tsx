'use client';

import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { initializeAuth } from '@/store/slices/authSlice';
import { store } from '@/store/slices';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Initialiser l'auth depuis localStorage au montage
        store.dispatch(initializeAuth());
    }, []);

    return <Provider store={store}>{children}</Provider>;
}