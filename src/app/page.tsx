'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import CyberCursor from '@/components/CyberCursor';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-cyber-black">
        <motion.div 
          className="text-5xl font-cyber text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="neon-text mb-4" data-text="LOADING">LOADING</h1>
          <motion.div 
            className="h-1 bg-cyber-blue"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <main className="relative overflow-hidden">
      <CyberCursor />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  );
} 