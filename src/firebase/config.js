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
  apiKey: "AIzaSyAGhz-d-MvNEk4bpVDzQyiKdz_jtpBpixs",
  authDomain: "microproyecto-2-si.firebaseapp.com",
  projectId: "microproyecto-2-si",
  storageBucket: "microproyecto-2-si.appspot.com",
  messagingSenderId: "11949251159",
  appId: "1:11949251159:web:870c7d7b64cbc8f851e112",
  measurementId: "G-2CGXNSWXNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app); 
export const store = getStorage(app); 

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
