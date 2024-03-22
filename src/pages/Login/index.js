// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase";

import { useState } from "react";
import { Link } from "react-router-dom";
import './login.scss'
import { useNavigate } from "react-router-dom";
import Spotify from "../../util/spotify";
import { IoArrowBack } from "react-icons/io5";

export default function LoginPage({ onLogin, setLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, SetErrorMsg] = useState([]);

  const loginHandler = async (e) => {
    e.preventDefault();

    await onLogin(email, password);
    if (setLogin !== false) {
      successfulLogin();
    }

  }

  const successfulLogin = () => {
    const accessToken = Spotify.getAccessToken();
    if (accessToken) {
      setTimeout(() => {
        navigate('/home');
      }, 3000);
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