import { useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    type User
} from 'firebase/auth';
import { auth } from '../firebase';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Listen for auth changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Sign up
    const signup = async (email: string, password: string) => {
        try {
            setError(null);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Signup failed';
            setError(errorMessage);
            throw err;
        }
    };

    // Sign in
    const signin = async (email: string, password: string) => {
        try {
            setError(null);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Signin failed';
            setError(errorMessage);
            throw err;
        }
    };

    // Sign out
    const logout = async () => {
        try {
            setError(null);
            await signOut(auth);
            setUser(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Logout failed';
            setError(errorMessage);
            throw err;
        }
    };

    return {
        user,
        loading,
        error,
        signup,
        signin,
        logout,
        isAuthenticated: !!user
    };
};