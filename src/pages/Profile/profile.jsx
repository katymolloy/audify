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

            <div className = 'user-information'>

                <HiMiniUserCircle />

                <div className = 'name-email-country'>
                    <h1>User_Name</h1>
                    <div>UserName@gmail.com</div>
                    <div>Canada</div>
                </div>

                <button>Edit Profile</button>

                <div className = 'followers-reviews'>
                    <div>
                        Total Followers: <strong>21</strong>
                    </div>
                    <div>
                        Total Reviews: <strong>99</strong>
                    </div>
                </div>
                
            </div>

            <Footer />
        </>

    );

}