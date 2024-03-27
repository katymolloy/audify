import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Review from '../../components/Review';
import { FaSpotify } from "react-icons/fa";
import { useParams } from "react-router-dom";
import spotify from "../../util/spotify";

import './album.scss';

export default function AlbumPage() {
    const { albumId } = useParams();
    const [album, setAlbum] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAlbumDetails = async () => {
            try {
                const albumDetails = await spotify.getAlbumInfo(albumId);
                setAlbum(albumDetails);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching album details:', error);
                setLoading(false);
            }
        };

        fetchAlbumDetails();
    }, [albumId]);

    const releaseDate = new Date(album.release_date);
    const releaseMonthYear = `${releaseDate.toLocaleString('default', { month: 'long' })} ${releaseDate.getFullYear()}`;

    function msToTime(duration) {
        const minutes = Math.floor(duration / 60000);
        const seconds = ((duration % 60000) / 1000).toFixed(0);
        return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
    }

    return (
        <>
            <Header />
            <div className='main'>
                <div className='album-section'>
                    <div className='img'>
                        <a href={album.external_urls?.spotify} target='_blank'>
                            <FaSpotify />
                        </a>
                    </div>
                    <div className='info'>
                        <span>
                            <h1>{album.name}</h1>
                            <p>{releaseMonthYear}</p>
                        </span>
                        <h2>Tracks</h2>
                        <ul>
                            {album.tracks?.items.map(track => (
                                <li key={track.id}>
                                    <strong>{track.name}</strong> - {msToTime(track.duration_ms)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <h2>WRITE A REVIEW</h2>
                <Review />
                <h2>REVIEWS</h2>
            </div>
            <Footer />
        </>
    );
}
