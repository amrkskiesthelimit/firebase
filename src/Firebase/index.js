// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDqFMFtdPAwJJ8isAYKj9XMEw3X_5xJbSQ",

  authDomain: "midtermfirebase-5365b.firebaseapp.com",

  projectId: "midtermfirebase-5365b",

  storageBucket: "midtermfirebase-5365b.appspot.com",

  messagingSenderId: "577086861803",

  appId: "1:577086861803:web:c4101ad8c5945115b469ae",

  measurementId: "G-NHWV47SCD7"

};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }