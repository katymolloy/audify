import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useNavigation, Link } from 'react-router-dom';
import spotify from "../../util/spotify";

import "./home.scss";


export default function HomePage({ currentUser }) {

    const [albums, setAlbums] = useState([]);
    const [savedAlbums, setSavedAlbums] = useState([]);

     const navigate = useNavigation();


    const logOutUser = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
          console.log('logged out')
          navigate('/');
        }).catch((error) => {
          console.log('Error signing out ' + error);
        })
      }

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const data = await spotify.home();
                setAlbums(data.newReleases);
                setSavedAlbums(data.userAlbums);
            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        };
        fetchAlbums();
    }, []);

    return (
        <>
            <Header onLogout={logOutUser}></Header>
            <div className='homeContainer'>
                <h1>Welcome Back user_name, Here's What We've Been Listening To...</h1>
                <h2>New Releases</h2>
                <div className="albums">
                    {/* Map through the albums array and display each album */}
                    {albums.map((album) => (
                        <div key={album.id} className="album">
                            <img src={album.cover} alt={album.name} />
                            <Link to={`albums/${album.name}`}>
                                <h3>{album.name}</h3>
                            </Link>
                            <p>{album.artist}</p>
                        </div>
                    ))}
                </div>
                <h2>Saved Albums</h2>
                <div className="albums"> {/* Add a div for saved albums */}
                    {savedAlbums.map((album) => (
                        <div key={album.id} className="album">
                            <img src={album.cover} alt={album.name} />
                            <Link to={`albums/${album.name}`}>
                                <h3>{album.name}</h3>
                            </Link>
                            <p>{album.artist}</p>
                        </div>
                    ))}
                </div>
                <h2>Latest Reviews</h2>
            </div>
            <Footer />
        </>
    )
}