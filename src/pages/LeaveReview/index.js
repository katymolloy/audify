import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import "./review.scss";

/**
 * Renders the review page component.
 * @returns {JSX.Element} Review page component.
 */
export default function ReviewPage() {

    return (
        <>
            <Header/>
            <div className='container reviewContainer'>
                <p>This is review page</p>
            </div>
            <Footer/>
        </>
    )
} 