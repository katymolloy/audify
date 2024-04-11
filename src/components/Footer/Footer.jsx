/* Footer of Audify */

import { FaSpotify } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./footer-styles.scss";

/**
 * Renders the footer component.
 * @returns The footer component
 */
export default function Footer() {
  return (
    <footer className="footer-main">
      <div className="shoutout-logo">
        <Link className="audify-logo" to="/home">
          <img src="/images/AudifyLogo.png" alt="Audify Logo"></img>
          <p>udify</p>
        </Link>
        <div className="shoutout">
          <FaSpotify />
          Powered By Spotify
        </div>
      </div>

      <div className="links-section">
        <div className="title">Quick Links</div>
        <Link to="/account">My Account</Link>
        <Link to="/about">About Us</Link>
      </div>

      <div className="copyright">
        <div>Created By Group 9</div>
        <div>&copy; 2024 Audify</div>
      </div>
    </footer>
  );
}
