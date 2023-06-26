import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDvbN1S8xVpTQh0vNNkK38hYs1_LTXtF_Q",
    authDomain: "roomieconnect.firebaseapp.com",
    projectId: "roomieconnect",
    storageBucket: "roomieconnect.appspot.com",
    messagingSenderId: "110567022959",
    appId: "1:110567022959:web:d04794675536d895e8889a",
    measurementId: "G-GQ446YFM9S"
};

// Initialize Firebase
initializeApp(firebaseConfig)

export const db = getFirestore();
