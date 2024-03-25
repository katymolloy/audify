import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../database/firebase";
import "./register.scss";
import { db } from "../../database/firebase";

import { redirectUri, clientId } from "../../util/spotify";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [unavailUsers, setUnavailUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const unavailableUsernames = [];
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


  const writeToDb = async (userId) => {
    try {
      await setDoc(doc(db, "users", userId), {
        uid: userId,
        username: username,
        password: password,
        email: email,
        display: displayName,
        pfp: profilePic,
      });

      await setDoc(doc(db, "usernames", username), {
        username: username,
        password: password,
        email: email,
        uid: userId,
      });
      // console.log("Data added successfully");

      navigate("/home");
    } catch (error) {
      console.log(`Error writing to database: ${error}`);
    }
  };

  const registerUser = async () => {
    if (errorMsg.length === 0) {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          writeToDb(user.uid);
        }
      );
    }
  };

  // const handleImageSubmit = () => {

  // }

  // const authorizeSpotify = () => {
  //     window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
  //     setAuthSpotify(true)
  // }

  const submitHandler = (e) => {
    e.preventDefault();
    const validate = [];

    // check for invalid/missing data
    if(unavailUsers.includes(username) === true){
      validate.push(`Username '${username}' is taken, please try a different one`)
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
      registerUser();
    }
  };

  return (
    <div className="container registerContainer">
      <Link to={"/"}>Back</Link>
      <h1>Create Account</h1>
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
          <label>
            Username{" "}
            <input type="text" onChange={(e) => setUsername((e.target.value).toLowerCase())} />
          </label>
        </div>
        <div>
          <label>
            Display Name{" "}
            <input
              type="text"
              onChange={(e) => setDisplayName(e.target.value)}
            ></input>
          </label>
        </div>

        {/* <div>
                    <label>Profile Picture <input
                        type="file"
                        onChange={handleImageSubmit}
                    ></input></label>
                </div> */}

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
              // type="password"
              type="text"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            Confirm Password{" "}
            <input
              // type="password"
              type="text"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            ></input>
          </label>
        </div>
        <div>
          Use of Audify requires a Spotify account. Not yet a Spotify user? Sign
          up{" "}
          <a href="https://www.spotify.com/us/signup" target="_blank">
            here!
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
  );
}
