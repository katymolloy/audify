import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Review from '../../components/Review';
import { FaSpotify } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { getUserData, auth,  } from "../../database/firebase";
import spotify from "../../util/spotify";

import './album.scss';

export default function AlbumPage() {
    const { albumId } = useParams();
    const [album, setAlbum] = useState({});
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([])


    //const 


    // useEffect(() => {
    //     getReviewById(setReviews, albumId);
    //     // const current = auth.currentUser;
    //     // console.log(current)
    //     // if (current) {
    //     //   getUserData(current, setUserInfo)
    //     // }
    // }, [])


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

    const releaseDate = loading ? null : new Date(album.release_date);
    const releaseMonthYear = loading ? '' : `${releaseDate.toLocaleString('default', { month: 'long' })} ${releaseDate.getFullYear()}`;

    function msToTime(duration) {
        const minutes = Math.floor(duration / 60000);
        const seconds = ((duration % 60000) / 1000).toFixed(0);
        return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
    }

    return (
        <>
            <Header />
            <div className='main'>
                <Link to={'/home'}>Home</Link>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className='album-section'>
                        <div className='img'>
                            <img loading="lazy" src={album.images[0].url} alt={album.name}></img>
                            <a href={album.external_urls.spotify} target='_blank'>
                                Open In Spotify
                                <FaSpotify />
                            </a>
                        </div>
                        <div className='info'>
                            <span>
                                <h1>{album.name}</h1>
                                <p>{album.artists[0].name}</p>
                                <p>{releaseMonthYear}</p>
                            </span>
                            <ul className='tracks'>
                                {album.tracks?.items.map(track => (
                                    <li key={track.id}>
                                        <div className='trackNumber'>{track.track_number}</div>
                                        <div className='titleArtists'>
                                            <p>{track.name}</p>
                                            <div className='artists'>
                                                <div className='explicit'>
                                                    {track.explicit ? 'E' : ''}
                                                </div>
                                                {track.artists.map((artist, index) => (
                                                    <div key={artist.id} className={index !== 0 ? 'name space' : 'name'}>
                                                        {artist.name}{index !== track.artists.length - 1 ? ', ' : ''}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='time'>
                                            {msToTime(track.duration_ms)}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                )}
                {!loading && (
                    <>
                        <h2>WRITE A REVIEW</h2>
                        <Review albumId={albumId} albumName={album.name} albumImg={album.images[0].url} />
                        <h2>REVIEWS</h2>
                        {reviews.map((review, index) => {

                            console.log('review:', review.review)
                            return (

                                <div>
                                    <h2 key={index}>{review.review}</h2>
                                </div>

                            )

                        })}

                    </>
                )}
            </div>
            <Footer />
        </>
    );
}
