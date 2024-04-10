import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import spotify from "../../util/spotify";

import { logOutUser, getUserData, auth } from "../../database/firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./home.scss";

/**
 * Renders the home page component.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.userDisplay - The display name of the user.
 * @param {string} props.username - The username of the user.
 * @returns {JSX.Element} Home page component.
 */
export default function HomePage() {
  const [albums, setAlbums] = useState([]);
  const [savedAlbums, setSavedAlbums] = useState([]);
  const [display, setDisplay] = useState('')
  const [userInfo, setUserInfo] = useState({})


  useEffect(() => {
    const current = auth.currentUser;
    console.log(current)
    if (current) {

      getUserData(current, setUserInfo)
      setDisplay(userInfo.display)
    }
  }, [])



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
      <Header onLogout={logOutUser}></Header>

      <div className="homeContainer">
        <h1>
          {display ?
            <div>Welcome Back {display}, Here's What We've Been Listening To...</div>
            :
            <div>Welcome Back, Here's What We've Been Listening To...</div>
          }
        </h1>
        <h2>New Releases</h2>
        <div className="albums">
          {/* Map through the albums array and display each album */}
          {albums.map((album, index) => (
            <Link className="album" to={`/album/${album.id}`} key={index}>
              <img loading="lazy" src={album.cover} alt={album.name} />
              <h3>{album.name}</h3>
              <p>{album.artist}</p>
            </Link>
          ))}
        </div>
        <h2>Saved Albums</h2>
        <div className="albums"> {/* Add a div for saved albums */}
          {savedAlbums.map((album, index) => (
            <Link className="album" to={`/album/${album.id}`} key={index}>
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
