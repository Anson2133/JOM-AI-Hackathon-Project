// pages/LandingPage.jsx
import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import "../auth.css";
import "../landing.css";

export default function LoginPage() {
    return (
        <>
           
            <main>
                <HeroSection />
                <ServicesSection />
                <FeaturesSection />
                <HowItWorksSection />
                <CTASection />
            </main>
            <Footer />
        </>
    );
}
