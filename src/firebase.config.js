
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCneE7kWxPqMhozQBPtVbv163egkcQnZtk",
  authDomain: "dope-setups.firebaseapp.com",
  projectId: "dope-setups",
  storageBucket: "dope-setups.appspot.com",
  messagingSenderId: "501995984342",
  appId: "1:501995984342:web:44f9f7b9571aa8e8ee8077",
  measurementId: "G-7WV3T1PZ41"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


export const db = getFirestore()