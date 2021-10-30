// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import env from './env';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: env.REACT_APP_API_KEY,
    authDomain: env.REACT_APP_AUTH_DOMAIN,
    projectId: env.REACT_APP_PROJECT_ID,
    storageBucket: env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: env.REACT_APP_MESSAGING_ID,
    appId: env.REACT_APP_APP_ID,
};

// Initialize Firebase
const firebaseService = initializeApp(firebaseConfig);
export const authService = getAuth(firebaseService);
export default firebaseService;
