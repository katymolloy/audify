import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4Uro1skL9__v_I8LI7hNHSGl0IrL5mG4",
  authDomain: "audify-20985.firebaseapp.com",
  projectId: "audify-20985",
  storageBucket: "audify-20985.appspot.com",
  messagingSenderId: "26870316743",
  appId: "1:26870316743:web:6286a6f178e1abb17088e2"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;