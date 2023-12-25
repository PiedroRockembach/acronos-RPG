import { initializeApp } from "@firebase/app"
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore"
  
const firebaseConfig = {
    apiKey: "AIzaSyCjQ35dRpJtJz0cXtUt-ML76SKFlhNYXkI",
    authDomain: "acronos-r.firebaseapp.com",
    projectId: "acronos-r",
    storageBucket: "acronos-r.appspot.com",
    messagingSenderId: "551679393547",
    appId: "1:551679393547:web:49f1160473dca144a1ec0e",
    measurementId: "G-158JCF0KWV"
  };

const app = initializeApp(firebaseConfig)
const db = getFirestore(app);

export const auth = getAuth(app)
export default db;