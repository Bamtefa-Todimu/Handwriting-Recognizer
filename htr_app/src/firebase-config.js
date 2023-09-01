// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX9sLmHywzPLdRZanSjkPMS-DAKMCYMTo",
  authDomain: "react-socialmedia-f7b5d.firebaseapp.com",
  projectId: "react-socialmedia-f7b5d",
  storageBucket: "react-socialmedia-f7b5d.appspot.com",
  messagingSenderId: "898625755715",
  appId: "1:898625755715:web:3e803f1bfc0275775c12f6",
  measurementId: "G-YX6EH970S0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);