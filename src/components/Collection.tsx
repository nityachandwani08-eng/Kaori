import { motion } from 'motion/react';
import Reveal from './Reveal';

const products = [
  {
    id: 1,
    name: "Mizu No Oto",
    description: "Ocean Salt & Driftwood",
    notes: ["Sea Salt", "Driftwood", "Mineral Ambrette"],
    launch: "2024",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Bleu de Chanel",
    description: "Chanel / Aromatic Woody",
    notes: ["Citrus", "Dry Cedar", "Sandalwood"],
    launch: "2010",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Sauvage",
    description: "Dior / Raw & Noble",
    notes: ["Reggio Bergamot", "Ambroxan", "Papua Vanilla"],
    launch: "2015",
    image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    name: "Libre",
    description: "YSL / Floral & Lavender",
    notes: ["Lavender", "Orange Blossom", "Musk Accord"],
    launch: "2019",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    name: "Ombre Nomade",
    description: "Louis Vuitton / Oud & Raspberry",
    notes: ["Oud Wood", "Benzoin Tears", "Raspberry"],
    launch: "2018",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    name: "N°5 L'Eau",
    description: "Chanel / Modern Floral",
    notes: ["Lemon", "Ylang-Ylang", "White Musks"],
    launch: "2016",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
  }
];

export default function Collection() {
  const handleDownload = async (imageUrl: string, productName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${productName.toLowerCase().replace(/\s+/g, '_')}_kaori.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // Fallback: Open in new tab if fetch fails (CORS)
      window.open(imageUrl, '_blank');
    }
  };

  return (
    <section id="collection" className="bg-kaori-teal pt-24 md:pt-40 pb-24 md:pb-40 px-6 md:px-24 -mt-[1px]">
      <div className="max-w-[1400px] mx-auto">
        {/* Title Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-32">
          <div>
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-4 font-bold">Catalogue / Vol. I</p>
            </Reveal>
            <Reveal delay={0.2}>
              <h3 className="text-4xl md:text-8xl font-light tracking-tighter text-white leading-none">
                Selected <br />
                <span className="italic font-serif text-kaori-mint">Movements</span>
              </h3>
            </Reveal>
          </div>
          <div className="mt-8 md:mt-4 text-left md:text-right opacity-50">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold block mb-2 font-serif italic text-kaori-mint">Atelier Kaori</span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-white font-bold block">Series 01 // Archival Selection</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 md:gap-y-32">
          {products.map((product, idx) => (
            <motion.div 
               key={product.id} 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1, duration: 0.8 }}
               className="group cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden bg-white/[0.03] mb-8 relative border border-white/10">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 right-6 text-[10px] font-bold opacity-30 text-white mix-blend-difference">
                   0{idx + 1}
                </div>
                
                {/* Hover Details */}
                <div className="absolute inset-0 bg-kaori-teal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px] flex flex-col justify-end p-8">
                   <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-white/50">Composition</p>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(product.image, product.name);
                          }}
                          className="text-[8px] uppercase tracking-widest font-bold text-kaori-mint hover:text-white transition-colors"
                        >
                          Download JPG
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                         {product.notes.map(note => (
                            <span key={note} className="text-[9px] text-white px-2 py-1 bg-white/10 rounded-sm border border-white/5 uppercase tracking-widest">{note}</span>
                         ))}
                      </div>
                      <div className="flex justify-between items-center pt-4">
                         <span className="text-[8px] uppercase tracking-widest font-bold text-white/40">Launch Year</span>
                         <span className="text-sm font-serif italic text-kaori-mint">{product.launch}</span>
                      </div>
                   </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 text-white">
                 <h4 className="text-2xl md:text-3xl tracking-tight font-serif italic text-kaori-mint group-hover:translate-x-2 transition-transform duration-500">{product.name}</h4>
                 <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/60 font-bold">{product.description}</p>
                 <div className="mt-4 h-[1px] bg-white/10 w-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-kaori-mint/30 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                 </div>
              </div>
            </motion.div>
          ))}

          {/* Special Joiner / CTA Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center border border-dashed border-white/20 aspect-[4/5] p-12 text-center group cursor-pointer hover:bg-white/[0.02] transition-colors duration-500"
          >
             <div className="flex flex-col items-center gap-8">
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold max-w-[200px]">
                  Explore the full archival collection of series 01
                </p>
                <button className="group relative w-48 h-48 rounded-full border border-white/20 flex items-center justify-center text-[9px] uppercase tracking-[0.3em] font-bold text-white hover:text-kaori-teal transition-all duration-500 overflow-hidden">
                  <span className="relative z-10 px-6">Archive Selection</span>
                  <div className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                </button>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
