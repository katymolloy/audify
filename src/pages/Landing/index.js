import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { FaSpotify } from "react-icons/fa";

import "../Landing/style.scss";

export default function LandingPage() {
  const [isDark, setIsDark] = useState("dark");
  const themeIcon = isDark === "dark" ? <MdLightMode /> : <MdDarkMode />;

  return (
    <div className="landingContainer" id={isDark}>
      <div className="info">
        <span className="logo">
          <img src="/images/AudifyLogo.png" alt="Audify Logo"></img>

          <div className="column">
            <p className="logoTitle">AUDIFY</p>
            <p className="logoTag">Unleash Your Thoughts</p>
          </div>

          <button
            className="dark-mode-toggle"
            onClick={() => setIsDark(isDark === "light" ? "dark" : "light")}
          >
            {themeIcon}
          </button>
        </span>
        <h1 className="">Blah Blah Blah Blah</h1>
        <h2>Album Review Platform</h2>
        <div className="signIn-signUp-container">
          <div className="signInButton">
            <Link to="/login">
              Sign In
              <FaArrowRight />
            </Link>
          </div>
          <div className="column createAccount">
            Don't have an account?
            <Link to="/register">Create one now</Link>
          </div>
          <div className="spotifyTag">
            <FaSpotify />
            Powered By Spotify
          </div>
        </div>
      </div>
      <div className="albums">
        <div class="card-home">
          <img src="/images/Row1.png" className="AlbumRow" alt="Album Covers"></img>
          <img src="/images/Row2.png" className="AlbumRow" alt="Album Covers"></img>
          <img src="/images/Row3.png" className="AlbumRow" alt="Album Covers"></img>
          <img src="/images/Row4.png" className="AlbumRow" alt="Album Covers"></img>
          <img src="/images/Row5.png" className="AlbumRow" alt="Album Covers"></img>
          <img src="/images/Row6.png" className="AlbumRow" alt="Album Covers"></img>
          <img src="/images/Row7.png" className="AlbumRow" alt="Album Covers"></img>
          <img src="/images/Row1.png" className="AlbumRow" alt="Album Covers"></img>
          <img src="/images/Row2.png" className="AlbumRow" alt="Album Covers"></img>
          <img src="/images/Row3.png" className="AlbumRow" alt="Album Covers"></img>
        </div>
      </div>
    </div>
  );
}
