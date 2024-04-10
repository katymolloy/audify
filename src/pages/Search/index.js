import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import spotify from "../../util/spotify";

import "./search.scss";

export default function SearchPage() {

    return (
        <>
            <Header />

            <Footer />
        </>
    );
}
