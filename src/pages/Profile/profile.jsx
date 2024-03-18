import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { HiMiniUserCircle } from "react-icons/hi2";

import spotify from "../../util/spotify";

import './profile.scss';


export default function ProfilePage() {

    // Back-end code here...


    return (

        <>
            <Header />

            {/* The User's Information Displayed */}
            <div className='user-information'>

                <HiMiniUserCircle />

                <div className='name-email-country'>
                    <h1>User_Name</h1>
                    <div>UserName@gmail.com</div>
                    <div>Canada</div>
                </div>

                <button>Edit Profile</button>

                <div className='followers-reviews'>
                    <div>
                        Total Followers: <strong>21</strong>
                    </div>
                    <div>
                        Total Reviews: <strong>99</strong>
                    </div>
                </div>

            </div>


            <h3>
                RECENT ACTIVITY
            </h3>


            {/* The User's Review Activity */}
            <div className='recent-actvity'>

                <div className='album-cover'>
                    <img src='picture' alt='Album Cover' />
                </div>

                <div className = 'details'>
                    <div>
                        <HiMiniUserCircle /> User_Name
                    </div>

                    <h3>
                        ALBUM NAME
                    </h3>
                    <div>
                        2024
                    </div>

                    <div>
                        Wow I really like this album
                    </div>
                </div>

            </div>

            <Footer />
        </>

    );

}