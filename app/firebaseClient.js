/**
 * @file firebaseClient.js
 * @description This file initializes the Firebase application, Firestore, and Firebase Authentication 
 * using the configuration stored in environment variables. It exports the Firestore database 
 * and the authentication instance for use in other parts of the application.
 */

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { config } from "dotenv";

// Load environment variables from the .env file
config();

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

let app, db, auth;

try {
  // Initialize Firebase
  /**
   * Initializes the Firebase app, Firestore database, and Firebase Authentication.
   * 
   * @constant {FirebaseApp} app - The initialized Firebase app instance.
   * @constant {Firestore} db - The Firestore database instance.
   * @constant {FirebaseAuth} auth - The Firebase Authentication instance.
   */
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  console.log("Firebase successfully initialized");
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

// Export the initialized Firestore database and authentication instance for use in other modules.
export { db, auth };
