// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase";

import { useState } from "react";
import { Link } from "react-router-dom";
import './login.scss'
import { useNavigate } from "react-router-dom";

export default function LoginPage({onLogin}) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, SetErrorMsg] = useState([]);


    const loginHandler = (e)=>{
        e.preventDefault();
        const validate = [];

        if(email.length < 8) {
            validate.push('Please enter a valid email');
        }
        if(password.length < 5) {
            validate.push('Please enter a valid password');
        }
        SetErrorMsg(validate);
        
        if(validate.length === 0){
            onLogin(email, password);
            navigate('/home');
        }
    }
    
    return (
      <div className="container loginContainer">
        <Link to={"/"}>Back</Link>
        <h1>Login</h1>
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
            <label>
              Email{" "}
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </label>
          </div>
          <div>
            <label>
              Password{" "}
              <input
                type="text"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </label>
          </div>

          <button type="submit" onClick={loginHandler}>
            Login
          </button>
        </form>
      </div>
    );
}