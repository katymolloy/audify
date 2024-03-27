import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import spotify from "../../util/spotify";
import { signOut, getAuth } from "firebase/auth";

import "./home.scss";

/**
 * Renders the home page component.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.userDisplay - The display name of the user.
 * @param {string} props.username - The username of the user.
 * @returns {JSX.Element} Home page component.
 */
export default function HomePage({ userDisplay, username }) {
  const [albums, setAlbums] = useState([]);
  const [savedAlbums, setSavedAlbums] = useState([]);
  const navigate = useNavigate();

  /**
   * Logs out the current user.
   */
  const logOutUser = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("logged out");
        navigate("/");
      })
      .catch((error) => {
        console.log("Error signing out " + error);
      });
  };

  useEffect(() => {
    /**
     * Fetches albums data from Spotify API.
     */
    const fetchAlbums = async () => {
      try {
        const data = await spotify.home();
        setAlbums(data.newReleases);
        setSavedAlbums(data.userAlbums);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };
    fetchAlbums();
  }, []);

  return (
    <>
      <Header onLogout={logOutUser} username={username}></Header>

      <div className="homeContainer">
        <h1>
          Welcome Back {userDisplay}, Here's What We've Been Listening To...
        </h1>
        <h2>New Releases</h2>
        <div className="albums">
          {/* Map through the albums array and display each album */}
          {albums.map((album) => (
            <Link className="album" to={`/album/${album.id}`}>
              <img loading="lazy" src={album.cover} alt={album.name} />
              <h3>{album.name}</h3>
              <p>{album.artist}</p>
            </Link>
          ))}
        </div>
        <h2>Saved Albums</h2>
        <div className="albums"> {/* Add a div for saved albums */}
          {savedAlbums.map((album) => (
            <Link className="album" to={`/album/${album.id}`}>
              <img src={album.cover} alt={album.name} />
              <h3>{album.name}</h3>

              <p>{album.artist}</p>
            </Link>
          ))}
        </div>
        <h2>Latest Reviews</h2>
      </div>

      <Footer />
    </>
  );
}
