import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { FaStar } from "react-icons/fa6";

import './review.scss';

/**
 * Renders the review component.
 * @returns {JSX.Element} Review component.
 */
export default function Review() {
  const [reviewMessage, setReviewMessage] = useState("");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  /**
   * Handles the submission of the review.
   * Backend functionality can be implemented here.
   */
  const handleReviewSubmit = () => {
    // Back-end functionality goes here. . .
    console.log("The review has been submitted");
  };

  return (
    <form className="review-component" onSubmit={handleReviewSubmit}>
      <div className="review-container">
        {/* Review Message Section -- This is the 1st half of the review section */}
        <div className="review-message">
          <label>
            <strong>REVIEW MESSAGE</strong>

            <br />

            <textarea
              value={reviewMessage}
              onChange={(event) => setReviewMessage(event.target.value)}
              placeholder="Write a review. . ."
              maxLength="500"
            />
          </label>
        </div>

        {/* Rating Section -- This is the 2nd half of the review section */}
        <div className="rating-section">
          <label>
            <strong>RATING</strong>

            <br />

            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;

              return (
                <label key={i}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onChange={() => setRating(ratingValue)}
                  />
                  <FaStar
                    className="star"
                    color={
                      ratingValue <= (hover || rating) ? "#1db954" : "#ededed"
                    }
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </label>

          <div className="add-review-button">
            <button>SUBMIT</button>
          </div>
        </div>
      </div>
    </form>
  );
}