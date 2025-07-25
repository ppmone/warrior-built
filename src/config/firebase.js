import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRRkdqKL-G1lMMPeHWna4W7B4afOXlFrs",
    authDomain: "warrior-built.firebaseapp.com",
    projectId: "warrior-built",
    storageBucket: "warrior-built.firebasestorage.app",
    messagingSenderId: "492643304856",
    appId: "1:492643304856:web:43887c7c41f68b2f8cd7ed",
    measurementId: "G-8WJ8ZBFY65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };