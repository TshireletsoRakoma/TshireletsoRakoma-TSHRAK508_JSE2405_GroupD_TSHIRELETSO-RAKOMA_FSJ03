/**
 * @file firebaseConfig.js
 * @description This file initializes the Firebase application using the configuration
 * stored in environment variables. It exports the Firebase app instance for use
 * in other parts of the application.
 */

import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore'; // Uncomment to use Firestore

/**
 * Firebase configuration object containing the necessary credentials
 * to connect to the Firebase project.
 * 
 * @constant {Object} firebaseConfig
 * @property {string} apiKey - The API key for the Firebase project.
 * @property {string} authDomain - The authentication domain for the Firebase project.
 * @property {string} projectId - The unique identifier for the Firebase project.
 * @property {string} storageBucket - The Cloud Storage bucket for the Firebase project.
 * @property {string} messagingSenderId - The sender ID for Firebase Cloud Messaging.
 * @property {string} appId - The unique identifier for the Firebase app.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
/**
 * Initializes the Firebase app using the provided configuration.
 * 
 * @constant {FirebaseApp} app - The initialized Firebase app instance.
 */
const app = initializeApp(firebaseConfig);

// Export the initialized Firebase app for use in other modules.
export default app;
