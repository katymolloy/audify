import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import "./about.scss";


export default function AboutPage() {

    return (
        <>
            <Header/>
            <div className='container aboutContainer'>
                <p>This is about page</p>
            </div>
            <Footer/>
        </>
    )
} 