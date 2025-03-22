'use client';

import React from 'react';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.7,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    }),
  };

  // Create cyberpunk grid effect
  useEffect(() => {
    if (!gridRef.current) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Clear previous grid
    while (gridRef.current.firstChild) {
      gridRef.current.removeChild(gridRef.current.firstChild);
    }
    
    // Create new grid lines
    const createLine = (start: [number, number], end: [number, number], color: string) => {
      const line = document.createElement('div');
      const length = Math.sqrt(
        Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2)
      );
      const angle = Math.atan2(end[1] - start[1], end[0] - start[0]) * (180 / Math.PI);
      
      line.style.position = 'absolute';
      line.style.width = `${length}px`;
      line.style.height = '1px';
      line.style.backgroundColor = color;
      line.style.opacity = '0.15';
      line.style.top = `${start[1]}px`;
      line.style.left = `${start[0]}px`;
      line.style.transform = `rotate(${angle}deg)`;
      line.style.transformOrigin = '0 0';
      
      return line;
    };
    
    // Horizontal lines
    for (let i = 0; i < 10; i++) {
      const y = Math.random() * height;
      const line = createLine([0, y], [width, y], '#00f0ff');
      gridRef.current.appendChild(line);
    }
    
    // Vertical lines
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * width;
      const line = createLine([x, 0], [x, height], '#ff00ff');
      gridRef.current.appendChild(line);
    }
    
    // Diagonal lines
    for (let i = 0; i < 5; i++) {
      const startX = Math.random() * width;
      const startY = Math.random() * height;
      const endX = Math.random() * width;
      const endY = Math.random() * height;
      const line = createLine([startX, startY], [endX, endY], '#b967ff');
      gridRef.current.appendChild(line);
    }
  }, []);

  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div ref={gridRef} className="absolute inset-0 z-0" />
      
      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-black/90 to-cyber-dark/70 z-10" />
      
      <div className="container mx-auto px-4 z-20 mt-16">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-2"
          >
            <span className="inline-block py-1 px-3 border border-cyber-blue text-cyber-blue text-sm font-future uppercase tracking-wider">
              Portfolio 2.0
            </span>
          </motion.div>
          
          <motion.h1
            custom={0}
            initial="hidden"
            animate="visible"
            variants={titleVariants}
            className="text-5xl md:text-7xl font-cyber font-bold mb-4"
          >
            <span className="block">Amrik Singh</span>
            <span className="neon-text glitch-text" data-text="DEVELOPER">DEVELOPER</span>
          </motion.h1>
          
          <motion.p
            custom={1}
            initial="hidden"
            animate="visible"
            variants={titleVariants}
            className="text-lg md:text-xl text-gray-300 mb-8 font-future"
          >
            Building digital experiences for the future. Specializing in web development with a focus on modern, interactive, and accessible user interfaces.
          </motion.p>
          
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={titleVariants}
            className="flex flex-wrap gap-4"
          >
            <a href="#projects" className="cyber-button">
              View Projects
            </a>
            <a href="#contact" className="cyber-button" style={{ borderColor: '#ff00ff', color: '#ff00ff', boxShadow: '0 0 5px #ff00ff' }}>
              Contact Me
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-cyber-blue font-future text-sm uppercase tracking-widest mb-2">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero; 