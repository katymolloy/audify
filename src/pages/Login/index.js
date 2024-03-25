import { signInWithEmailAndPassword } from "firebase/auth";
import {auth, db} from '../../database/firebase'
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import './login.scss'
import { useNavigate, Link } from "react-router-dom";
import Spotify from "../../util/spotify";
import { IoArrowBack } from "react-icons/io5";

export default function LoginPage({ updateUser, updateUserData }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, SetErrorMsg] = useState([]);

  const loginHandler = async (e) => {
    e.preventDefault();

    login(email, password)

  }

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('here',)
        successfulLogin();
        updateUser(userCredential.user.uid)
        getUserData(userCredential.user.uid);
      })
      .catch((err) => {
        const errorCode = err.code;
        console.log(errorCode)

      })
  }

  const successfulLogin = () => {
    const accessToken = Spotify.getAccessToken();
    if (accessToken) {
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    }
  }

  const getUserData = async (user) => {
    console.log("Fetching user data for user:", user);
    const docRef = doc(db, "users", user);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());

      updateUserData(docSnap.data().username, docSnap.data().display)
    

    } else {
      console.log("No such document for user:", user);
    }
  }

  return (
    <div className="container loginContainer">
      <div className="card">
        <Link className="backLink" to={"/"}><IoArrowBack /></Link>
        <img className="logo" src="/images/AudifyLogo.png" alt="Audify Logo"></img>
        <h1 className="title">Welcome Back</h1>
        <p className="sub">Login to get started</p>
        <form className="loginForm">
          {errorMsg.length > 0 && (
            <div className="login-errorBox">
              Invalid Data:
              <ul>
                {errorMsg.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <input
              type="text"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <input
              type="text"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <button type="submit" onClick={loginHandler}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
