import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text' | 'view'>('default');
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 400 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      
      if (target.closest('.cursor-view')) {
        setCursorType('view');
      } else if (
        target.closest('button') || 
        target.closest('a') || 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON'
      ) {
        setCursorType('pointer');
      } else if (target.tagName === 'P' || target.tagName === 'H3' || target.tagName === 'H2') {
        setCursorType('text');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="hidden md:block">
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] flex items-center justify-center mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: cursorType === 'view' ? 80 : cursorType === 'pointer' ? 12 : 8,
            height: cursorType === 'view' ? 80 : cursorType === 'pointer' ? 12 : 8,
            backgroundColor: cursorType === 'view' ? '#D9E2E0' : '#FFFFFF',
          }}
          className="rounded-full shadow-xl"
        >
          {cursorType === 'view' && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] text-[#1A3C34] font-semibold uppercase tracking-widest flex items-center justify-center h-full"
            >
              View
            </motion.span>
          )}
        </motion.div>
      </motion.div>
      
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 border border-white/20 rounded-full pointer-events-none z-[99] mix-blend-difference"
        animate={{
          scale: cursorType === 'pointer' ? 1.5 : cursorType === 'view' ? 0 : 1,
          opacity: cursorType === 'default' ? 0.4 : 0.8,
        }}
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </div>
  );
}
