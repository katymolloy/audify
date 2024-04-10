import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../database/firebase";
import "./register.scss";
import { db, writeUserToDb, registerUser } from "../../database/firebase";

import { redirectUri, clientId } from "../../util/spotify";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";


export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [unavailUsers, setUnavailUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);

  const navigate = useNavigate();

  /**
   * Executes an effect after the component is mounted to retrieve existing usernames from the database.
   * These usernames are then stored in the state for further use.
   * @function useEffect
   * @param {Function} effect - The function containing the side effect to be executed.
   * @param {Array} dependencies - An array of dependencies for the effect. If empty, the effect only runs once after the initial render.
   */
  useEffect(() => {
    const unavailableUsernames = [];

    /**
     * Retrieves existing usernames from the 'usernames' collection in the database and sets them in the component state.
     * @function retrieveUsernames
     * @returns {Promise} A Promise that resolves once the usernames are retrieved and set in the state.
     */
    const retrieveUsernames = async () => {
      const querySnapshot = await getDocs(collection(db, "usernames"));
      querySnapshot.forEach((doc) => {
        unavailableUsernames.push(doc.id);
      });
      // console.log('Existing Users: ', unavailableUsernames);
      setUnavailUsers(unavailableUsernames);
      return unavailableUsernames;
    };
    retrieveUsernames();
  }, []);




  const submitHandler = (e) => {
    e.preventDefault();
    const validate = [];

    // check for invalid/missing data
    if (unavailUsers.includes(username) === true) {
      validate.push(
        `Username '${username}' is taken, please try a different one`
      );
    }
    if (username.length < 3) {
      validate.push("Please enter a valid username with at least 3 characters");
    }
    if (displayName.length < 3) {
      validate.push(
        "Please enter a valid display name with at least 3 characters"
      );
    }
    if (email.length < 8) {
      validate.push("Please enter a valid email with 8 or more characters");
    }
    if (password.length < 5) {
      validate.push("Please enter a password with at least 5 characters");
    }
    if (password !== passwordConfirm) {
      validate.push("Passwords do not match");
    }

    setErrorMsg(validate);

    // run when no data is invalid/missing
    if (validate.length === 0) {
      let user = registerUser(email, password);
      writeUserToDb(user, username, email, displayName);
      navigate('/home')
    }
  };

  return (
    <div className="container registerContainer">
      <div className="card">
        <Link to={"/"} className="backLink">
          <IoArrowBack />
        </Link>
        <img
          className="logo"
          src="/images/AudifyLogo.png"
          alt="Audify Logo"
        ></img>
        <h1 className="title">Create Account</h1>
        <p className="sub">Enter All Fields to get set up</p>
        <form className="loginForm">
          {errorMsg.length > 0 && (
            <div className="errorBox">
              Invalid data:
              <ul>
                {errorMsg.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <input
              placeholder="User Name"
              type="text"
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
            />
          </div>
          <div>
            <input
              placeholder="Display Name"
              type="text"
              onChange={(e) => setDisplayName(e.target.value)}
            ></input>
          </div>

          <div>
            <input
              placeholder="Email Address"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <input
              placeholder="Confirm Password"
              type="password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            ></input>
          </div>
          <div className="signUp">
            Use of Audify requires a Spotify account. <br></br>Not yet a Spotify
            user?
            <a href="https://www.spotify.com/us/signup" target="_blank">
              {" "}
              Sign up here
            </a>
          </div>

          {/* <button type="button" onClick={authorizeSpotify}>Link Spotify</button> */}
          {/* {authSpotify && */}
          <button type="submit" onClick={submitHandler}>
            Create Account
          </button>
          {/* } */}
        </form>
      </div>
    </div>
  );
}
