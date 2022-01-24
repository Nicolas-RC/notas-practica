import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClG83DLq7vX0oHe0HddLC9-vomT7pBmU8",
  authDomain: "notas-efda2.firebaseapp.com",
  projectId: "notas-efda2",
  storageBucket: "notas-efda2.appspot.com",
  messagingSenderId: "950354516097",
  appId: "1:950354516097:web:180dd5c3ff8384b3271580"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
    db,
    auth
};
