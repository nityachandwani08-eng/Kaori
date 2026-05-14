import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export default function VideoExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);

  // We use useScroll on the container to get a progress value from 0 to 1
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Apply a slight spring to the progress to smooth out the scrub
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // We need to wait for the video metadata to load to get its duration
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    // In case the metadata is already loaded before the effect runs
    if (video.readyState >= 1) {
      setDuration(video.duration);
    }

    // Attempt to preload the video
    // On some browsers, play() and pause() force the loading to start more aggressively if preload wasn't enough
    const forceLoad = async () => {
      try {
        await video.play();
        video.pause();
        video.currentTime = 0;
      } catch (err) {
        // Autoplay might be blocked, ignore
      }
    };
    forceLoad();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // Sync scroll progress with video currentTime
  useEffect(() => {
    return smoothProgress.on('change', (latest) => {
      if (videoRef.current && duration > 0) {
        // Use requestAnimationFrame for smooth UI updates
        requestAnimationFrame(() => {
          if (videoRef.current) {
            videoRef.current.currentTime = latest * duration;
          }
        });
      }
    });
  }, [smoothProgress, duration]);

  // Transform values for text overlays
  const overlayOpacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [1, 0, 0, 1]);
  const overlayY = useTransform(smoothProgress, [0, 0.05], [0, 50]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="bg-black relative"
    >
      {/* 
        This container defines the scrollable area. 
        Example: 500vh means the user has to scroll 5 times the viewport height to reach the end.
      */}
      <div ref={containerRef} className="h-[500vh] w-full relative">
        
        {/* Sticky container stays fixed on the screen while scrolling */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
          
          {/* The video element */}
          <video
            ref={videoRef}
            src={`${import.meta.env.BASE_URL}scene-2.mp4`}
            className="w-full h-full object-cover opacity-90"
            preload="auto"
            muted
            playsInline
          />
          
          {/* Subtle vignette over the video */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />

          {/* Intro text that fades out as you scroll */}
          <motion.div 
            style={{ opacity: overlayOpacity, y: overlayY }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
          >
            <h1 className="text-white text-5xl md:text-8xl font-light tracking-tighter mix-blend-difference text-center uppercase">
              Immerse <br />
              <span className="italic font-serif text-kaori-mint block mt-4">In the Scene</span>
            </h1>
            <p className="mt-8 text-white/50 text-sm uppercase tracking-[0.4em]">Scroll to Explore</p>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="mt-12 opacity-50"
            >
              <div className="w-px h-16 bg-gradient-to-b from-kaori-mint to-transparent mx-auto" />
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </motion.div>
  );
}
