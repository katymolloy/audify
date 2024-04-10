/* Footer of Audify */

import { FaSpotify } from "react-icons/fa";

import "./footer-styles.scss";

/**
 * Renders the footer component.
 * @returns The footer component
 */
export default function Footer() {
  return (
    <footer className="footer-main">
      <div className="shoutout-logo">
        <a className="audify-logo" href="/home">
          <img src="/images/AudifyLogo.png" alt="Audify Logo"></img>
          <p>udify</p>
        </a>
        <div className="shoutout">
          <FaSpotify />
          Powered By Spotify
        </div>
      </div>

      <div className="links-section">
        <div className="title">Quick Links</div>

        <a href="/account">My Account</a>

        <a href="/about">About Us</a>

      </div>

      <div className="copyright">
        <div>Created By Group 9</div>
        <div>&copy; 2024 Audify</div>
      </div>
    </footer>
  );
}
