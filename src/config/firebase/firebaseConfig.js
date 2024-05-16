// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBBht6s2Bk4rZ2HCojEgV371Y2sBesTgNQ",
    authDomain: "dsv-nodejs-service.firebaseapp.com",
    projectId: "dsv-nodejs-service",
    storageBucket: "dsv-nodejs-service.appspot.com",
    messagingSenderId: "1097837455423",
    appId: "1:1097837455423:web:9c306415337ce17b3eb08a",
    measurementId: "G-36N0JTMK42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);