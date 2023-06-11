// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_APP_APIKEY}`,
  authDomain: `${import.meta.env.VITE_APP_AUTHDOMAIN}`,
  projectId: `${import.meta.env.VITE_APP_PROJECTID}`,
  storageBucket: `${import.meta.env.VITE_APP_STORAGEBUCKET}`,
  messagingSenderId: `${import.meta.env.VITE_APP_MESSAGINGSENDERID}`,
  appId: `${import.meta.env.VITE_APP_APPID}`,  

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app); 
export const store = getStorage(app); 

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
