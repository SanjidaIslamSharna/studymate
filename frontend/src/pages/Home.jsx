import React from "react";
import HeroBanner from "../components/HeroBanner";
import TopStudyPartners from "../components/TopStudyPartners";
import HowItWorks from "../components/HowItWorks";
import Testimonial from "../components/Testimonial";

const Home = () => {
    return (
        <>
            <HeroBanner />
            <TopStudyPartners />
            <HowItWorks />
            <Testimonial />
        </>
    )
}

export default Home;