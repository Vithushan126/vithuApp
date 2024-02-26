import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyA5G7WQGwjxqKXEhLR79BSfa7Y7yyZI2ZM",
  authDomain: "vithuapp-90a40.firebaseapp.com",
  projectId: "vithuapp-90a40",
  storageBucket: "vithuapp-90a40.appspot.com",
  messagingSenderId: "473714133466",
  appId: "1:473714133466:web:b44fdb5c91815af21998e3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
