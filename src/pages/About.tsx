import { motion } from 'motion/react';
import Reveal from '../components/Reveal';
import Magnetic from '../components/Magnetic';
import { ArrowRight, Globe, Award, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-kaori-teal text-white pt-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=2000" 
            alt="Atelier Background" 
            className="w-full h-full object-cover opacity-20 scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-kaori-teal via-transparent to-kaori-teal" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <Reveal>
            <span className="text-[10px] uppercase tracking-[0.6em] mb-8 block font-bold text-kaori-mint">The House of Kaori</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-6xl md:text-9xl font-light tracking-tighter leading-none mb-8">
              A LEGACY <br />
              <span className="italic font-serif text-kaori-mint">IN SILENCE.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 md:py-40 px-6 md:px-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="order-2 md:order-1">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-serif italic text-kaori-mint mb-10">The Artisanal Vision</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg md:text-xl font-light text-white/70 leading-relaxed uppercase tracking-wide mb-8">
                Established in the coastal serenity of Kamakura, Kaori was born from a singular desire: to capture the intangible essence of the Pacific horizon.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-sm text-white/50 leading-relaxed uppercase tracking-widest">
                Our house operates at the intersection of Japanese precision and French olfactory tradition. Each fragrance is a movement, aged in volcanic stone vessels to achieve a depth that transcends traditional perfumery.
              </p>
            </Reveal>
          </div>
          <div className="order-1 md:order-2 relative aspect-[4/5] overflow-hidden">
             <motion.img 
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src="https://images.unsplash.com/photo-1547610291-114006678731?auto=format&fit=crop&q=80&w=1200" 
                alt="Craftsmanship"
                className="w-full h-full object-cover grayscale brightness-75"
                referrerPolicy="no-referrer"
             />
             <div className="absolute inset-0 border-[20px] border-kaori-teal/50" />
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-white/5 py-24 md:py-40 px-6 md:px-24 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16 md:gap-8">
            {[
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Ethical Sourcing",
                desc: "We partner with local coastal communities to sustainably harvest biological resins and marine botanicals."
              },
              {
                icon: <Award className="w-6 h-6" />,
                title: "Rare Distillation",
                desc: "Employing proprietary cold-press methods that preserve the molecular integrity of our delicate raw materials."
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Limited Editions",
                desc: "Quantities are dictated by the seasons. We never prioritize scale over the sacred quality of the craft."
              }
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="flex flex-col items-center text-center p-8 bg-kaori-teal/30 border border-white/5 backdrop-blur-sm">
                  <div className="mb-8 p-4 bg-kaori-mint/10 text-kaori-mint rounded-full">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-serif italic mb-4 text-kaori-mint">{item.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed uppercase tracking-[0.2em]">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Atelier Section */}
      <section className="py-24 md:py-40 overflow-hidden">
        <div className="flex flex-col md:flex-row items-stretch">
          <div className="flex-1 min-h-[400px] md:min-h-0 bg-kaori-sand">
            <img 
              src="https://images.unsplash.com/photo-1490424660416-359912d314b3?auto=format&fit=crop&q=80&w=1200" 
              alt="Atelier Detail" 
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 p-10 md:p-32 flex flex-col justify-center bg-kaori-teal">
            <Reveal>
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-8 block font-bold">The Atelier</span>
              <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-none mb-12 uppercase">
                MADE IN <br />
                <span className="italic font-serif text-kaori-mint">KAMAKURA.</span>
              </h2>
              <p className="text-white/60 mb-12 text-lg font-light leading-relaxed uppercase tracking-wider">
                Visit our flagship sanctuary, where the sounds of the ocean meet the science of scent.
              </p>
              <Magnetic strength={0.3}>
                <button className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold border-b border-white/20 pb-4 hover:border-kaori-mint transition-colors group">
                  Book A Private Viewing
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer Quote */}
      <section className="py-40 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-2xl md:text-4xl font-serif italic text-kaori-mint/80 leading-relaxed">
              "Fragrance is the most intense form of memory. It is the language of the soul when words are no longer sufficient."
            </p>
            <div className="w-20 h-[1px] bg-white/20 mx-auto mt-12" />
            <span className="text-[10px] uppercase tracking-[0.5em] mt-8 block opacity-30">Hiroshi Yamamoto — Founder</span>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
