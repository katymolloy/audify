import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";


import "./style.scss";

export default function LandingPage() {
  const [isDark, setIsDark] = useState('dark');
  const themeIcon = isDark === 'dark' ? <MdLightMode /> : <MdDarkMode />;

  return (
    <div className="container landingContainer" id={isDark}>
      <div className="info">
        <span className="logo">
          <img src="/images/AudifyLogo.png" alt="Audify Logo"></img>

          <div className="column">
            <p className="logoTitle">AUDIFY</p>
            <p className="logoTag">Unleash Your Thoughts</p>
          </div>

          <button
            className="dark-mode-toggle"
            onClick={() => setIsDark(isDark === 'light' ? 'dark' : 'light')}
          >
            {themeIcon}
          </button>
        </span>
        <h1 className="">Blah Blah Blah Blah</h1>
        <h2>Album Review Platform</h2>
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
        <span className="spotifyTag">
          <img src="/images/spotifyLogo.png" alt="Spotify Logo"></img>
          <p>Powered By Spotify</p>
        </span>
      </div>

      <div className="albums">{/* scrolling album work here */}</div>
    </div>
  );
}
