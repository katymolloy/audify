import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const login = (e) => {
        e.preventDefault();
        console.log('heyyy', email, password)
        // signInWithEmailAndPassword(auth, email, password)
        // .then((userCredential) => {
        //     const user = userCredential.user
        // })
    }

    return (
        <div className="container loginContainer">
            <h1>Login</h1>
            <form className="loginForm">
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

                <button type="submit" onClick={login}>Login</button>
            </form>
        </div>
    )
}