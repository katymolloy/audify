// AlbumCard.js
import React from "react";
import { Link } from "react-router-dom";

import "./albumcard.scss";

const AlbumCard = ({ album }) => {
    return (
        <Link className="album" to={`/album/${album.id}`}>
            <img loading="lazy" src={album.cover} alt={album.name} />
            <h3>{album.name}</h3>
            <p>{album.artist}</p>
        </Link>
    );
};

export default AlbumCard;