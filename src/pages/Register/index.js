import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import './register.scss';
import { db } from "../../firebase";

import { redirectUri, clientId } from "../../util/spotify";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [authSpotify, setAuthSpotify] = useState(false);
    const [errorMsg, setErrorMsg] = useState([])


    const navigate = useNavigate();


    // useEffect(function getUsernames() {
    //     console.log('heyy')
    // })

    const writeToDb = async (userId) => {
        try {
            await setDoc(doc(db, 'users', userId), {
                uid: userId,
                username: username,
                display: displayName,
                pfp: profilePic,
            });

            await setDoc(doc(db, 'usernames', username), {
                username: username,
                uid: userId,
            });
            console.log('Data added successfully')

            navigate('/home');

        } catch (error) {
            console.log(`Error writing to database: ${error}`)
        }
    }



    const registerUser = async () => {
        if (errorMsg.length === 0) {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user
                    writeToDb(user.uid);
                })
        }
    }


    const handleImageSubmit = () => {

    }


    // const authorizeSpotify = () => {
    //     window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    //     setAuthSpotify(true)
    // }

    const submitHandler = (e) => {
        e.preventDefault();
        registerUser();
    }

    return (
        <div className="container registerContainer">
            <Link to={'/'}>Back</Link>
            <h1>Create Account</h1>
            <form className="loginForm">
                <div className="errorBox">
                    {errorMsg && errorMsg.forEach((error) => error)}
                </div>
              

                <div>
                    <label>Username <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                    ></input></label>
                </div>
                <div>
                    <label>Display Name <input
                        type="text"
                        onChange={(e) => setDisplayName(e.target.value)}
                    ></input></label>
                </div>

                <div>
                    <label>Profile Picture <input
                        type="file"
                        onChange={handleImageSubmit}
                    ></input></label>
                </div>

                <div>
                    <label>Email <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                    ></input></label>
                </div>
                <div>
                    <label>Password <input
                        type="text"
                        onChange={(e) => setPassword(e.target.value)}
                    ></input></label>
                </div>
                <div>Use of Audify requires a Spotify account. Not yet a Spotify user? Sign up <a href="https://www.spotify.com/us/signup">here!</a></div>

                {/* <button type="button" onClick={authorizeSpotify}>Link Spotify</button> */}
                {/* {authSpotify && */}
                    <button type="submit" onClick={submitHandler}>Create Account</button>
                {/* } */}

            </form>
        </div>
    )
}