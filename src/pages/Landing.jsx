import React from 'react'
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TopLists from "../components/TopLists";
import StatsBar from "../components/StatsBar";
import WhyJoin from "../components/WhyJoin";
import CTABanner from "../components/CTABanner";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import Model from '../components/Model';

const Landing = () => {
    return (
        <div className="antialiased">
            <header className="grad-hero-bg">
                <Navbar />
                <Hero />
            </header>

            <TopLists />
            <StatsBar />
            <WhyJoin />
            <CTABanner />
            <Testimonials />           
        </div>
    )
}

export default Landing