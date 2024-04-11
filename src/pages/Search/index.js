import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AlbumCard from "../../components/AlbumCard/index";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Spotify from "../../util/spotify";

import "./search.scss";

export default function SearchPage() {
    const [albums, setAlbums] = useState([]);
    const { query } = useParams();

    useEffect(() => {
        if (query.trim() !== "") {
            Spotify.search(query)
                .then(albums => {
                    setAlbums(albums);
                })
                .catch(error => {
                    console.error("Error searching albums:", error);
                });
        }
    }, [query]);

    return (
        <>
            <Header />
            <div className="search-page">
                <h1>Search Results for {query}</h1>
                <div className="album-list">
                    {albums.map((album, index) => (
                        <AlbumCard key={index} album={album} />
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
}
