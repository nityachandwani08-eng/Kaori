import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import Reveal from './Reveal';
import Magnetic from './Magnetic';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen md:h-screen flex flex-col md:flex-row items-stretch overflow-hidden border-b border-kaori-seagreen/10 pt-20">
      {/* Left Column - Content */}
      <div className="w-full md:w-[45%] flex flex-col justify-end p-8 md:p-20 z-10 border-r border-white/10 bg-kaori-teal relative text-white min-h-[50vh] md:min-h-0">
        <div className="max-w-md">
          <Reveal delay={0.2}>
            <h2 className="text-5xl md:text-8xl font-light tracking-tight leading-[0.9] mb-12">
              BEYOND <br />
              <span className="italic font-serif text-kaori-mint">SENSE.</span>
            </h2>
          </Reveal>
          
          <Reveal delay={0.4}>
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-semibold mb-10 md:mb-16 opacity-60 max-w-xs leading-relaxed">
              Archival scents distilled from the memory of the deep ocean. Edition limited to 500 vessels globally.
            </p>
          </Reveal>
          
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 1, duration: 1 }}
             className="flex"
          >
            <Magnetic strength={0.2}>
              <button className="group relative w-full md:w-auto px-16 py-6 overflow-hidden bg-white text-kaori-teal text-[11px] uppercase font-bold tracking-[0.4em]">
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">Acquire Volume I</span>
                <div className="absolute inset-0 bg-kaori-teal translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              </button>
            </Magnetic>
          </motion.div>
        </div>
        
        {/* Section number/indicator */}
        <div className="absolute top-20 right-6 md:right-10 text-[10px] uppercase tracking-widest opacity-20 font-bold rotate-90 origin-right">
          CATALOGUE // 2024
        </div>
      </div>

      {/* Right Column - Visual */}
      <div className="flex-1 relative overflow-hidden bg-kaori-sand min-h-[40vh] md:min-h-0">
        <motion.div 
          style={{ y: imgY, scale: imgScale }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1547637589-f54c34f5d7a4?auto=format&fit=crop&q=80&w=2000" 
            alt="Deep ocean"
            className="w-full h-full object-cover opacity-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-kaori-seagreen/10" />
        </motion.div>
        
        {/* Floating Label */}
        <div className="absolute bottom-12 right-12 z-20 text-white mix-blend-difference hidden lg:block">
           <Reveal delay={0.8}>
              <div className="flex items-center gap-6">
                 <div className="w-12 h-[1px] bg-white opacity-50" />
                 <span className="text-[9px] uppercase tracking-[0.5em] font-bold">Mizu No Oto Movement</span>
              </div>
           </Reveal>
        </div>
      </div>
    </section>
  );
}
