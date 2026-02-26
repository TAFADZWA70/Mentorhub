import { useState, useEffect } from 'react';
import {
    ref,
    set,
    get,
    update,
    remove,
    onValue,
    DataSnapshot
} from 'firebase/database';
import { database } from '../firebase';

export const useRealtimeDB = () => {
    // Write data to database
    const writeData = async (path: string, data: any) => {
        try {
            const dbRef = ref(database, path);
            await set(dbRef, data);
            return { success: true };
        } catch (error) {
            console.error('Write error:', error);
            return { success: false, error };
        }
    };

    // Read data from database (one-time)
    const readData = async (path: string) => {
        try {
            const dbRef = ref(database, path);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                return snapshot.val();
            }
            return null;
        } catch (error) {
            console.error('Read error:', error);
            return null;
        }
    };

    // Update data in database
    const updateData = async (path: string, data: any) => {
        try {
            const dbRef = ref(database, path);
            await update(dbRef, data);
            return { success: true };
        } catch (error) {
            console.error('Update error:', error);
            return { success: false, error };
        }
    };

    // Delete data from database
    const deleteData = async (path: string) => {
        try {
            const dbRef = ref(database, path);
            await remove(dbRef);
            return { success: true };
        } catch (error) {
            console.error('Delete error:', error);
            return { success: false, error };
        }
    };

    return {
        writeData,
        readData,
        updateData,
        deleteData
    };
};

// Hook for real-time listening to data
export const useRealtimeListener = (path: string) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const dbRef = ref(database, path);

        const unsubscribe = onValue(
            dbRef,
            (snapshot: DataSnapshot) => {
                if (snapshot.exists()) {
                    setData(snapshot.val());
                } else {
                    setData(null);
                }
                setLoading(false);
            },
            (err) => {
                setError(err.message);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [path]);

    return { data, loading, error };
};