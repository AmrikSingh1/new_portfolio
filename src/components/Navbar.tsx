'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrolled(position > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'projects', 'contact'];
      const sectionElements = sections.map(id => document.getElementById(id));
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && section.offsetTop - 100 <= position) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-cyber-black/80 backdrop-blur-lg py-3' : 'bg-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.a 
          href="#home" 
          className="text-2xl font-cyber font-bold neon-text"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          AS<span className="text-cyber-pink">.</span>
        </motion.a>
        
        <div className="hidden md:flex space-x-1">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className={`px-4 py-2 font-future uppercase tracking-wider text-sm relative ${
                activeSection === item.href.substring(1) 
                  ? 'text-cyber-blue' 
                  : 'text-white hover:text-cyber-blue'
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {activeSection === item.href.substring(1) && (
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-cyber-blue"
                  layoutId="navbar-underline"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {item.name}
            </motion.a>
          ))}
        </div>
        
        <motion.div 
          className="md:hidden flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <button className="cyber-button text-xs py-1">
            Menu
          </button>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 