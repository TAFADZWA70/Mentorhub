import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAPZHVzt7WfkbpiYumu8oczfblCSJ9RhAs",
    authDomain: "mentorhub-f3b3b.firebaseapp.com",
    projectId: "mentorhub-f3b3b",
    databaseURL: "https://mentorhub-f3b3b-default-rtdb.firebaseio.com",
    storageBucket: "mentorhub-f3b3b.firebasestorage.app",
    messagingSenderId: "369942926364",
    appId: "1:369942926364:web:42639c51219f572f5ebbd9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firebase Realtime Database
export const database = getDatabase(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

export default app;