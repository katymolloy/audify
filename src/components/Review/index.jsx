import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { CiStar } from "react-icons/ci";


export default function Review() {

    const [reviewMessage, setReviewMessage] = useState('');
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const handleReviewSubmit = () => {
        // Back-end functionality goes here. . .
        console.log('The review has been submitted');
    }


    return (

        <form className='review-component' onSubmit={handleReviewSubmit}>

            {/* Review Message Section */}
            <div className='review-message'>

                <label>
                    REVIEW MESSAGE

                    <br />

                    <textarea
                        value={reviewMessage}
                        onChange={(event) => setReviewMessage(event.target.value)}
                        placeholder='Write a review. . .'
                        maxLength='1000'
                    />
                </label>

            </div>


            {/* Rating Section */}
            <div className='rating-section'>

                <label>
                    RATING

                    <br />

                    {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;

                        return (
                            <label>
                                <input
                                    type='radio'
                                    name='rating'
                                    value={rating}
                                    onClick={() => setRating(ratingValue)}
                                />
                                <CiStar
                                    className='star'
                                    color={ratingValue < rating ? '#1db954' : '#fff'}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(null)}
                                />
                            </label>
                        );
                    })}
                </label>

            </div>


            <div className="add-review-button">
                <button>SUBMIT</button>
            </div>

        </form>

    );

}