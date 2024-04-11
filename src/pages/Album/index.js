import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Review from '../../components/Review';
import ReviewCard from '../../components/ReviewCard';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaSpotify } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
<<<<<<< HEAD
import { getReviewsForAlbum, } from "../../database/firebase";
=======
import { getReviewsForAlbum } from '../../database/firebase';
>>>>>>> 766fda0afaeadd34dba18ce247af62e42772a0d2

import spotify from "../../util/spotify";

import './album.scss';

export default function AlbumPage() {
    const { albumId } = useParams();
    const [album, setAlbum] = useState({});
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        getReviewsForAlbum(setReviews, albumId)
    }, [albumId])

    useEffect(() => {
        console.log(reviews);
    }, [reviews])


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
                            <span>
                                <a href={album.external_urls.spotify} target='_blank' className='linkCard'>
                                    Spotify
                                    <FaSpotify />
                                </a>
                                <Link to={`/search/${album.artists[0].name}`} className='linkCard'>
                                    More From {album.artists[0].name}
                                    <FaArrowUpRightFromSquare />
                                </Link>
                            </span>
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
                                                    {track.explicit ? <p>E</p> : ''}
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
                        {reviews.length > 0 ?
                            <div>
                                {reviews.map((review, index) => {
                                    console.log('review:', review.review)
                                    return (
        
                                        <ReviewCard key={index} review={review} />
        
                                    )
                                })}
                            </div>

                            :
                            <div>No reviews for {album.name} yet!</div>
                        }
                    </>
                )}
            </div>
            <Footer />
        </>

    );
}
