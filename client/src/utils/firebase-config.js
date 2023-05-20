import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8Ny4vhnJR4wLJ9r4oRzTXhkVZWleb7c4",
  authDomain: "netflix-clone-domniic.firebaseapp.com",
  projectId: "netflix-clone-domniic",
  storageBucket: "netflix-clone-domniic.appspot.com",
  messagingSenderId: "173681688347",
  appId: "1:173681688347:web:17007d60b7e0b60cdc9dbe"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
