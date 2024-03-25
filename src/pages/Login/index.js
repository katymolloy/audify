// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase";

import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.scss";
import { useNavigate } from "react-router-dom";

/**
 * @param {function(string, string)} onLogin
 *  a function that is called when the user submits the form
 * @returns
 *  a login form
 */
export default function LoginPage({ onLogin, onUserInfo }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState([]);
  const [validCredentials, setValidCredentials] = useState(false);

  const existingInfo = [];

  // const result = onUserEmails();
  // console.log("user email from login", onUserEmails());

  /**
   * @param {Event} event - the form submit event
   */
  const loginHandler = (e) => {
    e.preventDefault();
    const validate = [];
    if (email.length < 8) {
      validate.push("Please enter a valid email");
      // console.log(
      //   "accounts with email and password that do exist",
      //   existingInfo
      // );
      alert('Login Failed');
    }
    if (password.length < 5) {
      validate.push("Please enter a valid password");
    }
    if (validate.length === 0) {
      onUserInfo().forEach((element) => {
        // console.log("element from forEach", email.includes(element.email));
        if (email === element.email && password === element.password) {
          onLogin(email, password);
          setValidCredentials(true);
          navigate("/home");
          return email;
        } else {
          if (!element.password && !element.email) {
            validate.push("Please enter a valid email and password");
          }
          if (element.password && element.email) {
            existingInfo.push(element);
            // console.log(
            //   "accounts with email and password that do exist",
            //   existingInfo
            // );
          }
        }
      });
    }

    //TODO: Add further validation for incorrect email and password

    setErrorMsg(validate);
    // console.log('user info', onUserInfo());
  };

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
