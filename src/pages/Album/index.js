import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Review from '../../components/Review';

import { useParams } from "react-router-dom"
import { FaSpotify } from "react-icons/fa";


export default function AlbumPage(){
    const params = useParams();

    return(
        
        <>
            
            {/* The Album Itself Section */}
            <div className = 'album-section'>

                <div className = 'album-cover'>
                    <img src = 'album-source' alt = 'album-name' />
                </div>

                <div className = 'album-heading'>
                    <h1>{params.albumName}</h1>

                    <div>By: --Artist Name--</div>

                    <div>
                        Released <strong>--Year of Release--</strong>
                    </div>
                </div>

                <h1 className = 'open-in-spotify'>
                    <a>
                        OPEN IN SPOTIFY<FaSpotify />
                    </a>
                </h1>

            </div>


            {/* Make a Review Section */}
            <h2>
                WRITE A REVIEW
            </h2>

            <Review />


            {/* Reviews Section */}
            <h2>REVIEWS</h2>
        
        </>
    );
}