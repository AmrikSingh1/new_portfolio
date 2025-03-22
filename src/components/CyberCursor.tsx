'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CyberCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setCursorVariant('click');
    const handleMouseUp = () => setCursorVariant('default');

    const handleMouseEnterLink = () => setCursorVariant('hover');
    const handleMouseLeaveLink = () => setCursorVariant('default');

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Add event listeners to all links and buttons
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleMouseEnterLink);
      link.addEventListener('mouseleave', handleMouseLeaveLink);
    });

    return () => {
      // Clean up event listeners
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);

      links.forEach(link => {
        link.removeEventListener('mouseenter', handleMouseEnterLink);
        link.removeEventListener('mouseleave', handleMouseLeaveLink);
      });
    };
  }, []);

  // Different cursor variants
  const variants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      border: '2px solid #00f0ff',
      backgroundColor: 'rgba(0, 240, 255, 0.1)',
      mixBlendMode: 'normal' as const,
      height: 24,
      width: 24,
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      height: 40,
      width: 40,
      border: '2px solid #ff00ff',
      backgroundColor: 'rgba(255, 0, 255, 0.1)',
      mixBlendMode: 'difference' as const,
    },
    click: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      height: 24,
      width: 24,
      border: '2px solid #b967ff',
      backgroundColor: 'rgba(185, 103, 255, 0.4)',
      mixBlendMode: 'screen' as const,
    },
  };

  return (
    <>
      <motion.div
        className="cyber-cursor fixed top-0 left-0 z-50 rounded-full pointer-events-none hidden md:block"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.8 }}
      />
      <motion.div
        className="cyber-cursor-dot fixed top-0 left-0 z-50 rounded-full pointer-events-none h-2 w-2 bg-cyber-blue hidden md:block"
        animate={{
          x: mousePosition.x - 4, 
          y: mousePosition.y - 4,
          scale: cursorVariant === 'click' ? 0.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 15 }}
      />
      <style jsx global>{`
        body {
          cursor: none;
        }
        
        @media (max-width: 768px) {
          body {
            cursor: auto;
          }
        }
      `}</style>
    </>
  );
};

export default CyberCursor; 