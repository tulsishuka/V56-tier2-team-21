import React, { createContext, useContext, useEffect, useState } from 'react';
import { type User, signInWithPopup, signOut as firebaseSignOut, AuthError } from 'firebase/auth';
import { auth, githubProvider, googleProvider } from "@/lib/firebase";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    signInWithGoogle: () => Promise<void>;
    signInWithGithub: () => Promise<void>;
    signOut: () => Promise<void>;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const clearError = () => setError(null);

    const signInWithGoogle = async () => {
        try {
            setError(null);
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            const authError = err as AuthError;
            setError(authError.message);
            console.error("Error signing in with Google:", authError);
        }
    };

    const signInWithGithub = async () => {
        try {
            setError(null);
            await signInWithPopup(auth, githubProvider);
        } catch (err) {
            const authError = err as AuthError;
            setError(authError.message);
            console.error("Error signing in with GitHub:", authError);
        }
    };

    const signOut = async () => {
        try {
            setError(null);
            await firebaseSignOut(auth);
        } catch (err) {
            const authError = err as AuthError;
            setError(authError.message);
            console.error("Error signing out:", authError);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            error,
            signInWithGoogle,
            signInWithGithub,
            signOut,
            clearError
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}