const notes = [
  {
    type: "Top",
    name: "Yuzu & Sea Salt",
    description: "The first ripple. Sharp citrus meets crystalline ocean minerals.",
    image: "https://images.unsplash.com/photo-1605666807844-7890d6a84446?auto=format&fit=crop&q=80&w=400",
  },
  {
    type: "Heart",
    name: "Marine Lotus",
    description: "The core essence. A fluid floral heart that drifts on aquatic currents.",
    image: "https://images.unsplash.com/photo-1541097201912-320390a36bc6?auto=format&fit=crop&q=80&w=400",
  },
  {
    type: "Base",
    name: "Ambergris",
    description: "The lasting impression. Warm, oceanic depth that lingers like a memory.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=400",
  }
];

export default function OlfactoryJourney() {
  return (
    <section className="bg-kaori-teal text-white -mt-[1px]">
      <div className="border-b border-white/10 p-12 md:px-24 md:py-8 flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-bold">The Olfactory Journey</p>
        <div className="flex gap-2">
           <div className="w-2 h-2 bg-white/20 rounded-full" />
           <div className="w-2 h-2 bg-white/10 rounded-full" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3">
        {notes.map((note, idx) => (
          <div key={note.type} className="border-b md:border-b-0 md:border-r border-white/10 last:border-0 p-10 md:p-16 flex flex-col items-start text-left group">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-8 md:mb-12 font-bold">Movement 0{idx + 1} // {note.type}</span>
            <div className="w-full aspect-square overflow-hidden mb-8 md:mb-12 transition-all duration-1000 border border-white/5 p-4 bg-white/10">
               <img src={note.image} alt={note.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
            </div>
            <h4 className="text-2xl md:text-3xl tracking-tight mb-4 md:mb-6 font-serif italic text-kaori-mint">{note.name}</h4>
            <p className="text-[10px] md:text-xs text-white/50 leading-relaxed font-light uppercase tracking-widest">{note.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
