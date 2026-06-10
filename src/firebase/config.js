import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDrW-3MBY4g5oIvz0sCjIsBlv7QTeuh4BI",
  authDomain: "portfolio-fotograficzne.firebaseapp.com",
  projectId: "portfolio-fotograficzne",
  storageBucket: "portfolio-fotograficzne.firebasestorage.app",
  messagingSenderId: "832090124438",
  appId: "1:832090124438:web:da3d26b91a92c46184d2b7",
  measurementId: "G-C35XHCFG9Q",
};

// Firebase
const app = initializeApp(firebaseConfig);

// Serwisy
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);

export { auth, db, storage, functions };
