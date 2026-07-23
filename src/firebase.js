import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrVE6jGNZPHxjlNtw8TkN0DhLqtybbCyQ",
  authDomain: "studentvault-pro.firebaseapp.com",
  projectId: "studentvault-pro",
  storageBucket: "studentvault-pro.firebasestorage.app",
  messagingSenderId: "473864583383",
  appId: "1:473864583383:web:3f89ebc4fc7c7a084c1892",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

export default app;