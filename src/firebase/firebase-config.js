import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC6Xdxoi50Kuoxiy3xxr7eUlczoyNDunAI",
    authDomain: "react-app-curso-24e4d.firebaseapp.com",
    projectId: "react-app-curso-24e4d",
    storageBucket: "react-app-curso-24e4d.appspot.com",
    messagingSenderId: "482698763329",
    appId: "1:482698763329:web:3b186fc380c2f017503ac0"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();
 
const googleAuthProvider = new GoogleAuthProvider();

export{
    db,
    googleAuthProvider
}