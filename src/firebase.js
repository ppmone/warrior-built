// warrior-built/src/firebase.js

import { initializeApp } from 'firebase/app';
// You may need other imports like getAnalytics if you use them

// TODO: Replace the following with your app's Firebase project configuration
// This object can be found in your Firebase project settings.
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

// You can export the initialized app if you need it elsewhere,
// but for auth, just initializing is enough.
export default app;