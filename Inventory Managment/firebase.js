// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGL1kJoTuIbwdQAR_8ATrLtocKUN-2QX8",
  authDomain: "inventory-management-5da53.firebaseapp.com",
  projectId: "inventory-management-5da53",
  storageBucket: "inventory-management-5da53.appspot.com",
  messagingSenderId: "1082568212333",
  appId: "1:1082568212333:web:8d02a4438a12758bf76464",
  measurementId: "G-5HNG175EPB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app)

export{firestore}




// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBGL1kJoTuIbwdQAR_8ATrLtocKUN-2QX8",
//   authDomain: "inventory-management-5da53.firebaseapp.com",
//   projectId: "inventory-management-5da53",
//   storageBucket: "inventory-management-5da53.appspot.com",
//   messagingSenderId: "1082568212333",
//   appId: "1:1082568212333:web:8d02a4438a12758bf76464",
//   measurementId: "G-5HNG175EPB"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);