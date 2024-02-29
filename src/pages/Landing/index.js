import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import './style.scss';

export default function LandingPage() {
    return (
        <div className="container landingContainer">
            <div>
                <h1>AUDIFY</h1>
                <h2>Tagline here idfk</h2>
                <hr></hr>
                <div className="signInButton">
                    <Link to="/login">
                        Sign In
                    </Link><FaArrowRight />
                </div>
                <div className="createUserLink">
                    Don't have an account?
                    <Link to="/register" >
                        Create one now
                    </Link>
                </div>
            </div>

            <div>
                {/* scrolling album work here */}
            </div>
        </div>

    )
}