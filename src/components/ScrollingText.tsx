import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function ScrollingText() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 500]);

  return (
    <div ref={container} className="py-20 bg-kaori-navy overflow-hidden flex flex-col gap-8">
      <motion.div style={{ x: x1 }} className="flex whitespace-nowrap gap-12">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="text-7xl md:text-9xl font-serif text-white/5 uppercase tracking-tighter">
            Oceanic Serenity — Timeless Essence — Pure Tranquility —
          </span>
        ))}
      </motion.div>
      <motion.div style={{ x: x2 }} className="flex whitespace-nowrap gap-12">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="text-7xl md:text-9xl font-serif text-white/10 uppercase tracking-tighter italic">
            Japanese Precision — Fluid Senses — Deep Stillness —
          </span>
        ))}
      </motion.div>
    </div>
  );
}
