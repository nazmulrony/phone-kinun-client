// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD4rmKGoT6XDa-VokM-56NQGEDOFgRB0zQ",
    authDomain: "phone-kinun.firebaseapp.com",
    projectId: "phone-kinun",
    storageBucket: "phone-kinun.appspot.com",
    messagingSenderId: "1092845103430",
    appId: "1:1092845103430:web:26eb53a73240d41ddc9d47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;