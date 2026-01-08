import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import InteractiveMap from '../components/InteractiveMap';
import LostFound from '../components/LostFound';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Founders from '../components/Founders';
import Contact from '../components/Contact';
import FAQ from '../components/FAQ';
import StickyCTA from '../components/StickyCTA';
import ParallaxBackground from '../components/ParallaxBackground';

const HomePage = () => {
    return (
        <div className="home-page overflow-x-hidden bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300 relative">
            <ParallaxBackground />
            <Navbar />
            <Hero />
            <Features />
            <InteractiveMap />
            <LostFound />
            <Pricing />
            <Testimonials />
            <FAQ />
            <Founders />
            <Contact />
            <StickyCTA />

            <footer className="py-8 text-center text-gray-500 text-sm bg-[var(--color-bg-soft)] dark:border-t dark:border-slate-800 transition-colors duration-300">
                &copy; {new Date().getFullYear()} Snout Inc. All rights reserved.
            </footer>
        </div>
    );
};

export default HomePage;
