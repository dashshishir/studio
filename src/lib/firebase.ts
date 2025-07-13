import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDNWrSWSB22iQ7UO-My2V_tqWoTMgdldbg",
  authDomain: "devopshub-c1f99.firebaseapp.com",
  projectId: "devopshub-c1f99",
  storageBucket: "devopshub-c1f99.firebasestorage.app",
  messagingSenderId: "219080269473",
  appId: "1:219080269473:web:8b662a34d6ab767c6c1ae0",
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (typeof window !== 'undefined' && !getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} else if (getApps().length) {
  app = getApp();
  auth = getAuth(app);
  db = getFirestore(app);
}

// @ts-ignore - These will be initialized on the client side
export { app, auth, db };
