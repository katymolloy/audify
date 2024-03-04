/* Footer of Audify */

import { FaSpotify } from "react-icons/fa";

import './footer-styles.scss';


export default function Footer() {

    return (

        <>

            <footer className="footer-main">

                <div className="shoutout-logo">
                    <div className="audify-logo">
                        Audify
                    </div>
                    <div className='shoutout'>
                        <FaSpotify />Powered By Spotify hello world
                    </div>
                </div>


                <div className="links-section">
                    <div className = "title">Quick Links</div>

                    <a href='#'>Leave a Review</a>

                    <a href='#'>My Account</a>

                    <a href='#'>About Us</a>

                    <a href='#'>Sign Up</a>
                </div>


                <div className='copyright'>
                    <div>Created By Group 9</div>
                    <div>&copy; 2024 Audify</div>
                </div>

            </footer>

        </>

    );

}