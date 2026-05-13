import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
}

export default function Reveal({ children, width = "fit-content", delay = 0.25 }: RevealProps) {
  return (
    <div className="relative overflow-hidden" style={{ width }}>
      <motion.div
        variants={{
          hidden: { y: "100%" },
          visible: { y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
