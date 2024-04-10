import React from "react";
import { Link } from "react-router-dom";

import "./reviewcard.scss";

const ReviewCard = ({ review }) => {
    return (
        <div className="reviewCard">
            <img src={review.albumImg} alt={review.album} />
            <div className="reviewInfo">
                <p>{review.author}</p>
                <Link to={`/album/${review.albumId}`}>
                    <h3>{review.album}</h3>
                </Link>
                <p>{review.date}</p>
                <p>{review.review}</p>
                <p>{review.rating} Stars</p>
            </div>
        </div>
    );
};

export default ReviewCard;
