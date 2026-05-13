import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import Reveal from './Reveal';

export default function Philosophy() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="grid md:grid-cols-2 bg-kaori-teal border-b border-white/10 min-h-[80vh] text-white">
      <div className="border-r border-white/10 p-12 md:p-24 flex flex-col justify-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-10 font-bold">Manifesto / 01</p>
        </Reveal>
        
        <div className="flex flex-col gap-8 md:gap-10">
          <Reveal delay={0.3}>
            <h3 className="text-4xl md:text-8xl font-light leading-[0.9] tracking-tighter">
              SILENCING <br /> 
              <span className="italic font-serif text-kaori-mint">THE NOISE.</span>
            </h3>
          </Reveal>
          
          <Reveal delay={0.5}>
            <p className="text-white/70 leading-relaxed max-w-md font-light text-base md:text-lg tracking-wide uppercase">
              Born from the intersection of Japanese precision and the boundless tranquility of the Pacific. 
            </p>
          </Reveal>
        </div>

        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "circOut" }}
          className="h-[1px] bg-white/10 mt-16" 
        />
        
        <div className="mt-12 flex justify-between items-center">
           <Reveal delay={0.7}>
             <button className="text-[10px] uppercase tracking-[0.3em] font-bold hover:tracking-[0.5em] transition-all text-kaori-mint">
               The Full Story
             </button>
           </Reveal>
           <span className="text-[10px] font-bold opacity-20">EST. 2024</span>
        </div>
      </div>

      <div className="relative overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200" 
          alt="Beach Shore"
          className="w-full h-full object-cover brightness-105 group-hover:scale-105 transition-transform duration-[3000ms]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-kaori-seagreen/5" />
      </div>
    </section>
  );
}
