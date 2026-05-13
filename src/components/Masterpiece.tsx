import { motion } from 'motion/react';
import Magnetic from './Magnetic';
import Reveal from './Reveal';
import Perfume3D from './Perfume3D';

export default function Masterpiece() {
  return (
    <section className="relative min-h-screen grid md:grid-cols-2 bg-kaori-teal text-white border-b border-white/10">
      <div className="flex flex-col justify-center p-8 md:p-24 order-2 md:order-1 border-r border-white/10">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-10 font-bold">Limited Edition Selection</p>
        </Reveal>
        
        <Reveal delay={0.3}>
          <h3 className="text-6xl md:text-8xl font-light tracking-tighter mb-10 leading-[0.9]">
            UMI NO <br /> 
            <span className="italic font-serif text-kaori-mint">HIKARI</span>
          </h3>
        </Reveal>
        
        <Reveal delay={0.5}>
          <p className="text-white/50 font-light leading-relaxed mb-16 max-w-sm text-sm uppercase tracking-widest">
            A celestial fusion of bioluminescent depths and cool evening air. Aged for twenty-four months beneath the Pacific tides. 
            <br /><br />
            <span className="text-kaori-mint italic font-serif">Interactive Experience:</span> Use your cursor or touch to explore the architecture of the vessel.
          </p>
        </Reveal>
        
        <div className="flex gap-10">
          <Magnetic strength={0.3}>
            <button className="px-12 py-5 bg-white text-kaori-teal text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-kaori-mint transition-colors block">
              Acquire Vessel
            </button>
          </Magnetic>
          <Magnetic strength={0.3}>
            <button className="px-12 py-5 border border-white/20 text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white/10 transition-colors block">
              The Atelier
            </button>
          </Magnetic>
        </div>
      </div>
      
      <div className="relative overflow-hidden order-1 md:order-2 h-[70vh] md:auto flex items-center justify-center bg-kaori-teal">
        <img 
          src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=1200" 
          alt="Bioluminescent Water"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        
        <div className="relative z-10 w-full h-full flex items-center justify-center">
           <Perfume3D />
        </div>
        
        <div className="absolute top-10 right-10 flex flex-col gap-1 items-end opacity-20 z-20">
           <span className="text-[10px] font-mono leading-none">NO. 129 / 500</span>
           <div className="w-20 h-[1px] bg-white" />
        </div>
        
        {/* Interaction hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 opacity-30 pointer-events-none">
          <p className="text-[8px] uppercase tracking-[0.5em] font-bold">Orbit 3D View</p>
        </div>
      </div>
    </section>
  );
}

