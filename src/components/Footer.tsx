import { Link } from 'react-router-dom';
import Reveal from './Reveal';

export default function Footer() {
  return (
    <footer className="bg-kaori-teal text-white py-32 px-8 border-t border-white/10 relative z-10">
      <div className="grid md:grid-cols-4 gap-16 mb-32 max-w-7xl mx-auto">
        <div className="col-span-2">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-light tracking-[0.4em] mb-12">KAORI</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white/30 max-w-sm text-[11px] uppercase tracking-[0.3em] leading-loose font-bold">
              Archival scents distilled from the memory of the deep ocean. Edition limited to 500 vessels globally.
            </p>
          </Reveal>
        </div>
        
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.4em] mb-8 font-bold opacity-30">Selection</h4>
          <ul className="flex flex-col gap-4 text-[10px] uppercase tracking-[0.2em] font-bold">
            <li><Link to="/#collection" className="hover:text-kaori-mint transition-colors">Volume I</Link></li>
            <li><Link to="/#discovery" className="hover:text-kaori-mint transition-colors">Discovery</Link></li>
            <li><Link to="/#masterpiece" className="hover:text-kaori-mint transition-colors">Masterpiece</Link></li>
            <li><Link to="/about" className="hover:text-kaori-mint transition-colors">Our Story</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.4em] mb-8 font-bold opacity-30">Atelier</h4>
          <ul className="flex flex-col gap-4 text-[10px] uppercase tracking-[0.2em] font-bold">
            <li><Link to="/about" className="hover:text-kaori-mint transition-colors">Logistics</Link></li>
            <li><Link to="/about" className="hover:text-kaori-mint transition-colors">Privacy</Link></li>
            <li><Link to="/about" className="hover:text-kaori-mint transition-colors">Terms</Link></li>
            <li><Link to="/contact" className="hover:text-kaori-mint transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[10px] uppercase tracking-[0.3em] opacity-20 font-bold">© 2024 KAORI PERFUMES / ALL RIGHTS RESERVED</p>
        <div className="flex gap-10">
           {["Instagram", "Journal", "Weibo"].map((social) => (
             <a key={social} href="#" className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 hover:opacity-100 transition-opacity">{social}</a>
           ))}
        </div>
      </div>
    </footer>
  );
}
