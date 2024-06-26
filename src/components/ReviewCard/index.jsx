import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import "./reviewcard.scss";

const ReviewCard = ({ review }) => {
    const renderStars = (rating) => {
        const stars = [];
        const maxRating = 5;
        const filledStarColor = "#1db954"; // Change this to the desired color
        const emptyStarColor = "#ccc"; // Change this to the desired color for empty stars

        for (let i = 0; i < maxRating; i++) {
            stars.push(
                <FaStar
                    key={i}
                    color={i < rating ? filledStarColor : emptyStarColor}
                />
            );
        }
        return stars;
    };

    return (
        <div className="reviewCard">
            <img src={review.albumImg} alt={review.album} loading="lazy" />
            <div className="reviewInfo">
                <div>
                    <Link to={`/album/${review.albumId}`}>
                        <h3>{review.album}</h3>
                    </Link>
                    <p className="starRating">{renderStars(review.rating)}</p>
                    <p className="review">{review.review}</p>
                </div>
                <span>
                    <p className="author">{review.author} </p>
                    <p className="date">{review.date} {review.time}</p>
                </span>
            </div>
        </div>
    );
};

export default ReviewCard;
