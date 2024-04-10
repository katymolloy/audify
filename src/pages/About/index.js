import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import "./about.scss";

/**
 * Renders the About page.
 * @returns {JSX.Element} About page component.
 */
export default function AboutPage() {

    return (
        <>
            <Header/>
            <div className='aboutContainer'>
                <h2>Our Vision</h2>
                    <br/>
                    <p>We here at Audify have set out with one main goal. <b>Revolutionize the music review industry</b>. In 2024 we started our journey to creating the best web application for music enthusisiasts, where users can view and review albums from spotify. Soon after our vision was realized with Audify. As we look to add more and more features, we use modern design models to create ease for the user when browsing and leaving reviews on their favourite artists.</p>
                    <br/>
                <h2>Our Team</h2>
                    <br/>
                    <p>Our team here at Audify are closely knite, having all met through our education at Fanshawe. From there we set out to start our own music review platform. Having worked together both on projects and now our very own review business, teamwork and communication is fluid, resulting in good workflow through the team.</p>
                    <br/><br/>
            </div>
            <Footer/>
        </>
    )
} 