import { Link } from "react-router-dom"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import './notfound.scss';

/**
 * @function NotFound
 * @description This component is rendered when a user tries to access a page that doesn't exist.
 * @returns {JSX.Element} The not found component
 */
export default function NotFound() {
    return (
        <>
            <Header></Header>
            <div className="not-found">
                <h1>404: Page Not Found</h1>
                <div>Looks like you may be lost. Head back <Link to={'/home'}>home</Link>?</div>
            </div>
            <Footer></Footer>
        </>
    )
}