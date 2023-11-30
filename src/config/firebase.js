// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: 00 - Create a Firebase project & Set up your app
// Example: .env.local file
// REACT_APP_API_KEY=
// REACT_APP_AUTH_DOMAIN=
// REACT_APP_PROJECT_ID=
// REACT_APP_STORAGE_BUCKET=
// REACT_APP_MESSAGING_SENDER_ID=
// REACT_APP_APP_ID=
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
