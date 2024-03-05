import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyAa6HWNWLbZIeLipv_jtBBZtGA5yeShO48",

  authDomain: "audify-database.firebaseapp.com",

  projectId: "audify-database",

  storageBucket: "audify-database.appspot.com",

  messagingSenderId: "611138328808",

  appId: "1:611138328808:web:537b41412f89db5173915d",

  measurementId: "G-168BQHK999"

};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;