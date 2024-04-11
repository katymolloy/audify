import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { MdThumbUp } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { getUserData, auth, logOutUser } from '../../database/firebase';
import { Link } from "react-router-dom";
import ReviewCard from "../../components/ReviewCard/index";
import { useNavigate } from "react-router-dom";
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
    const [email, setEmail] = useState('')
    const [numOfReviews, setNumOfReviews] = useState(0)

    const navigate = useNavigate();

    useEffect(() => {
        const current = auth.currentUser;
        getUserData(current, setUserInfo)

    }, []);



    useEffect(() => {
        setDisplayName(userInfo.display);
        setEmail(userInfo.email)
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

    const logoutHandler = () => {
        logOutUser();
        navigate("/");
    };

    return (
        <>
            <Header />
            <div className='accountContainer'>
                <span className='userDetails'>
                    <div className='account'>
                        <BsPersonCircle />
                        <div>
                            <h1>{displayName}</h1>
                            <p className='username'>@{username}</p>
                            <p className='email'>{email}</p>
                        </div>
                    </div>
                    <p className='reviews'>Total Reviews: <strong>{numOfReviews}</strong></p>
                    <button type="button" onClick={logoutHandler} className="logout">
                        Log Out
                    </button>
                </span>

                <h2>Reviews</h2>
                {reviews ?
                    <div className="reviewContainer">
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