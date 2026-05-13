/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Collection from './components/Collection';
import OlfactoryJourney from './components/OlfactoryJourney';
import Masterpiece from './components/Masterpiece';
import ScrollingText from './components/ScrollingText';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import Magnetic from './components/Magnetic';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import About from './pages/About';
import Product3D from './pages/Product3D';
import Contact from './pages/Contact';
import VideoExperience from './pages/VideoExperience';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <Hero />
      <Philosophy />
      <Collection />
      <OlfactoryJourney />
      <Masterpiece />
      <ScrollingText />
      
      <section id="discovery" className="bg-kaori-teal border-t border-white/10 flex flex-col md:flex-row items-stretch text-white">
          <div className="flex-1 p-10 md:p-32 border-r border-white/10 flex flex-col justify-center items-start text-left">
              <span className="text-[11px] uppercase tracking-[0.5em] text-white/30 mb-8 md:mb-10 block font-bold">The Experience</span>
              <h3 className="text-5xl md:text-9xl font-light mb-8 md:mb-12 tracking-tighter leading-[0.85]">
                FIND YOUR <br /> 
                <span className="italic font-serif text-kaori-mint">SIGNATURE.</span>
              </h3>
              <p className="text-white/50 font-light mb-10 md:mb-16 text-base md:text-lg max-w-md uppercase tracking-wider leading-relaxed">
                 Experience the full spectrum of KAORI with our curated discovery set, featuring five distinct movements.
              </p>
              <Magnetic strength={0.4}>
                <button className="group relative w-full md:w-auto px-16 md:px-20 py-6 md:py-8 overflow-hidden bg-white text-kaori-teal text-[11px] uppercase font-bold tracking-[0.4em] transition-all">
                    <span className="relative z-10 transition-colors duration-500 group-hover:text-white">Request Discovery Set</span>
                    <div className="absolute inset-0 bg-kaori-mint translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
                </button>
              </Magnetic>
          </div>
          <div className="hidden md:block w-1/4 bg-white/5 p-12 flex flex-col justify-between italic text-[10px] opacity-20 font-bold uppercase tracking-[0.5em]">
             <span>EST. 2024</span>
             <div className="rotate-90 origin-left whitespace-nowrap">ARCHIVAL COLLECTION // VOL I</div>
          </div>
      </section>
    </motion.div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-kaori-teal selection:bg-white selection:text-kaori-teal relative font-sans text-white">
        {/* Universal Grid Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[1] flex">
          <div className="w-24 h-full border-r border-white/5 hidden md:block" />
          <div className="flex-1 h-full flex">
             <div className="flex-1 border-r border-white/5" />
             <div className="flex-1 border-r border-white/5" />
             <div className="flex-1 border-r border-white/5 hidden lg:block" />
          </div>
          <div className="w-24 h-full border-l border-white/5 hidden md:block" />
        </div>

        <SmoothScroll />
        <CustomCursor />
        <Navbar />
        
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/product-3d" element={<Product3D />} />
              <Route path="/video-experience" element={<VideoExperience />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

