import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

const login = (e) =>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user
    })
}

    return (
        <div className="container loginContainer">
            <h1>Login</h1>
            <form>
                <div>

                </div>
            </form>
        </div>
    )
}