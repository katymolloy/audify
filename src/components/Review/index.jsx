import React, { useState } from "react";
import { writeReviewToDb } from "../../database/firebase";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import "./review.scss";

/**
 * Renders the review component.
 * @returns {JSX.Element} Review component.
 */
export default function Review({ albumId, albumName, albumImg }) {
  const [reviewMessage, setReviewMessage] = useState("");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const navigate = useNavigate();


  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const d = new Date
    const dateTimestamp = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
    let hour = d.getHours();
    let amOrPm = ''
    if (hour > 12) {
      hour = hour - 12
      amOrPm = 'PM'
    } else {
      hour = hour
      amOrPm = 'AM'
    }
    const timestamp = `${hour}:${d.getMinutes()}${amOrPm}`

    writeReviewToDb(albumId, albumImg, albumName, reviewMessage, rating, dateTimestamp, timestamp);

    // Clearing Everything
    setReviewMessage('');
    setRating(0);

    navigate(`/home`);

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
