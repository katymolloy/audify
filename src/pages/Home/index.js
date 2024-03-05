import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import spotify from "../../util/spotify";

import "./home.scss";


export default function HomePage() {

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        // Function to fetch albums data from Spotify API
        const fetchAlbums = async () => {
            try {
                const data = await spotify.home(); // Fetch albums data from Spotify API
                setAlbums(data); // Update the albums state with fetched data
            } catch (error) {
                console.error('Error fetching albums:', error); // Log any errors that occur during fetching
            }
        };

        fetchAlbums(); // Call the fetchAlbums function when the component is mounted
    }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

    return (
        <>
            <Header></Header>
            <div className='container'>
                <h1>Welcome Back user_name, Here's What We've Been Listening To...</h1>
                <h2>New Releases</h2>
                <div className="albums">
                    {/* Map through the albums array and display each album */}
                    {albums.map((album) => (
                        <div key={album.id} className="album">
                            <img src={album.cover} alt={album.name} />
                            <a href={album.spotify} target="_blank" rel="noopener noreferrer">{album.name}</a>
                        </div>
                    ))}
                </div>
                <h2>Saved Albums</h2>
                <h2>Latest Reviews</h2>
            </div>
            <Footer />
        </>
    )
}