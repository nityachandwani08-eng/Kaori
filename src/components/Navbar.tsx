import { ShoppingBag, Search, Menu, User } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Magnetic from './Magnetic';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const scrollToIndex = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Fragrances", path: "/#collection" },
    { name: "Discovery", path: "/#discovery" },
    { name: "Product 3D", path: "/product-3d" },
    { name: "Video", path: "/video-experience" },
    { name: "Story", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  const mobileMenuItems = [
    { name: "Fragrances", path: "/#collection" },
    { name: "Discovery", path: "/#discovery" },
    { name: "Product 3D", path: "/product-3d" },
    { name: "Video", path: "/video-experience" },
    { name: "Story", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Collections", path: "/" },
    { name: "Atelier", path: "/about" }
  ];

  return (
    <>
      <motion.nav 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-stretch bg-kaori-teal/80 backdrop-blur-md border-b border-white/10 h-20 text-white"
      >
        <div className="flex items-center px-8 border-r border-white/10">
          <button className="md:hidden p-2" onClick={toggleMenu}>
            <Menu className="w-5 h-5 text-white" />
          </button>
          <div className="hidden md:flex gap-10 uppercase text-[9px] tracking-[0.3em] font-semibold text-white/80">
            {menuItems.map((item) => (
              <div key={item.name}>
                <Magnetic strength={0.3}>
                  <Link
                    to={item.path}
                    className="hover:text-kaori-mint transition-colors relative block"
                  >
                    {item.name}
                  </Link>
                </Magnetic>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center relative">
          <Link to="/" className="group">
            <motion.h1 
              className="text-xl md:text-3xl tracking-[0.6em] font-light text-white uppercase"
              whileHover={{ letterSpacing: "0.7em" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              KAORI
            </motion.h1>
          </Link>
        </div>

        <div className="flex items-center px-8 border-l border-white/10 gap-6">
          <Magnetic strength={0.4}>
            <button className="hidden md:block hover:opacity-100 opacity-60 transition-opacity p-2">
              <Search className="w-4 h-4 text-white" />
            </button>
          </Magnetic>
          <Magnetic strength={0.4}>
            <button className="relative group p-2">
              <ShoppingBag className="w-4 h-4 text-white opacity-60 group-hover:opacity-100 transition-opacity" />
              <span className="absolute top-1 right-1 bg-white text-kaori-teal text-[7px] w-3 h-3 flex items-center justify-center rounded-full font-bold">0</span>
            </button>
          </Magnetic>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-kaori-teal md:hidden"
          >
            <div className="flex flex-col h-full bg-kaori-teal text-white">
              <div className="h-20 flex items-center justify-between px-8 border-b border-white/10">
                <span className="text-sm tracking-[0.3em] font-bold">MENU</span>
                <button onClick={toggleMenu} className="p-2">
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <Menu className="w-6 h-6 rotate-90" />
                  </motion.div>
                </button>
              </div>
              
              <div className="flex-1 flex flex-col justify-center px-12 gap-12">
                {mobileMenuItems.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    onClick={toggleMenu}
                  >
                    <Link
                      to={item.path}
                      className="text-4xl font-serif italic text-kaori-mint block"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="p-12 border-t border-white/10 flex justify-between items-center bg-white/[0.02]">
                <div className="flex gap-6">
                  <span className="text-[10px] tracking-widest opacity-50 uppercase">Instagram</span>
                  <span className="text-[10px] tracking-widest opacity-50 uppercase">Twitter</span>
                </div>
                <span className="text-[10px] tracking-widest opacity-20 uppercase font-bold">ES-24</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
