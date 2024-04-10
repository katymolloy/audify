import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { MdThumbUp } from "react-icons/md";
import { getUserData, auth } from '../../database/firebase';
import { Link } from "react-router-dom";
// import { MdOutlineThumbUp } from "react-icons/md";
// import { BsPersonCircle } from "react-icons/bs";
// import ImageUpload from '../../components/ImageUpload/ImageUpload';


import "./account.scss";

/**
 * Renders the Account page
 * @returns {JSX.Element} Account page component.
 */
export default function AccountPage() {
    const [userInfo, setUserInfo] = useState({});
    const [displayName, setDisplayName] = useState('')
    const [reviews, setReviews] = useState([])
    const [username, setUsername] = useState('')
    const [numOfReviews, setNumOfReviews] = useState(0)

    useEffect(() => {
        const current = auth.currentUser;
        getUserData(current, setUserInfo)

    }, []);



    useEffect(() => {
        setDisplayName(userInfo.display);
        setReviews(userInfo.reviews)
        setUsername(userInfo.username)

    }, [userInfo]);


    useEffect(() => {
        setNumOfReviews(reviews.length)
        console.log(reviews)
    }, [reviews])

    return (
        <>
            <Header />
            <Link to={'/home'}>Home</Link>
            <div className='container accountContainer'>
                <h1>Hi there, {displayName}</h1>
                <h2>@{username}</h2>
                <p>{numOfReviews} reviews</p>
                {/* <div className="accountInfo">
               
                    <p><MdThumbUp />Rep: +1337</p>
                </div> */}
                <h2>Reviews</h2>
                {reviews ?
                    <div>
                        {reviews.map((review) => (
                            <div className="reviewCard">
                                <img src={review.albumImg}></img>
                                <div>{review.date}</div><div>{review.time}</div>
                                <div className="reviewInfo">
                                    <Link to={`/album/${review.albumId}`}><h3>{review.album}</h3></Link>
                                    <p>{review.review}</p>
                                    <p>{review.rating} Stars</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <>No reviews yet</>
                }

                {/* <h2>Options</h2> */}
                {/* <div className='accountOptions'>
                        <p>Profile Picture:</p> 
                        can eventually upload file to database to have custom icon on header
                        <ImageUpload/>
                    </div> */}
            </div>
            <Footer />
        </>
    )
}

//const [isThumbs, setThumbs] = useState('up');
//const thumbsIcon = isThumbs === 'down' ? <MdThumbUp /> : <MdOutlineThumbUp />;

// <button className="thumbs"onClick={() => setThumbs(isThumbs === 'up' ? 'down' : 'up')}>{thumbsIcon}</button> 