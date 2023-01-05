// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyCrDTk-DKA8dH5FKNgHRvRXt3guD9PscDk",
  authDomain: "todo-40c9e.firebaseapp.com",
  projectId: "todo-40c9e",
  storageBucket: "todo-40c9e.appspot.com",
  messagingSenderId: "1057535167333",
  appId: "1:1057535167333:web:c8bdfc7bc0490cd9956f8c",
  measurementId: "G-JYG3ZXS3LJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);