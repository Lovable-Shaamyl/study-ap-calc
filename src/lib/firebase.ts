// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8wMZN7Eyancb6jNZz9V7uYwC6yw3Hs98",
  authDomain: "lovablehackathondemo.firebaseapp.com",
  projectId: "lovablehackathondemo",
  storageBucket: "lovablehackathondemo.firebasestorage.app",
  messagingSenderId: "292999039337",
  appId: "1:292999039337:web:a9e5f0125d05b9a7cf55f8",
  measurementId: "G-55WKGQC1M9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Configure Google provider for better popup handling
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;