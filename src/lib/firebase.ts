import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from '../../next.config';

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (typeof window !== 'undefined') {
  if (!getApps().length) {
    if (!firebaseConfig.apiKey) {
      console.error("Firebase config is not set. Please check your .env file and next.config.ts.");
    } else {
      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      db = getFirestore(app);
    }
  } else {
    app = getApp();
    auth = getAuth(app);
    db = getFirestore(app);
  }
}

// @ts-ignore
export { app, auth, db };
