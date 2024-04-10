import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { MdThumbUp } from "react-icons/md";
import { getUserData, auth } from '../../database/firebase';
import { Link } from "react-router-dom";
import ReviewCard from "../../components/ReviewCard/index";
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

        setUsername(userInfo.username)
        let userReviews = []
        if (userInfo.reviews) {
            for (let i = 0; i < userInfo.reviews.length; i++) {
                userReviews.push(userInfo.reviews[i])
            }
        }
        setReviews(userReviews)
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
                        {reviews.map((review, index) => (
                            <ReviewCard key={index} review={review} />
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