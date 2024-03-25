import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { MdThumbUp } from "react-icons/md";
import { MdOutlineThumbUp } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import ImageUpload from '../../components/ImageUpload/ImageUpload';


import "./account.scss";


export default function AccountPage() {

    const currentUser = {};

    return (
        <>
            <Header/>
            <div className='container accountContainer'>
                <h1>Welcome user_name</h1>
                    <h2>Account Info</h2>
                        <div className="accountInfo">
                            <p>Creation Date: 12-34-56</p><br/>
                            <p># of Posts: 123456</p><br/>
                            <p><MdThumbUp />Rep: +1337</p><br/> {/*# of upvotes*/}
                        </div>
                    <h2>Options</h2>
                    <div className='accountOptions'>
                        <p>Profile Picture:</p><br/> {/*can eventually upload file to database to have custom icon on header*/}
                        <ImageUpload/>
                    </div>
            </div>
            <Footer/>
        </>
    )
}

//const [isThumbs, setThumbs] = useState('up');
//const thumbsIcon = isThumbs === 'down' ? <MdThumbUp /> : <MdOutlineThumbUp />;

// <button className="thumbs"onClick={() => setThumbs(isThumbs === 'up' ? 'down' : 'up')}>{thumbsIcon}</button> 