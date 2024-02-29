import { Link } from "react-router-dom"

export default function LandingPage() {
    return (
        <>
            <h1>Landing page works!</h1>
            <Link to="/register" >
                Register
            </Link>
            <Link to="/login" >
                Login
            </Link>
        </>
    )
}