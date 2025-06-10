import React, { createContext, useContext, useEffect, useState } from 'react';
import { type User, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, githubProvider, googleProvider } from "@/lib/firebase";

interface AuthContextType {
    user: User | null;
    githubUser: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
    signInWithGithub: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [githubUser, setgithubUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        })
        return unsubscribe;
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setgithubUser(user);
            setLoading(false);
        })
        return unsubscribe;
    }, []);

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };
    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }

    const signInWithGithub = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            setgithubUser(result.user);
        } catch (error) {
            console.error("Error signing in with Github:", error);
        }
    };


    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut, githubUser, signInWithGithub }}>
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