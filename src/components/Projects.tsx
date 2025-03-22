'use client';

import React from 'react';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Sample project data
const projects = [
  {
    id: 1,
    title: 'Neon Dreams',
    description: 'A futuristic e-commerce platform with cyberpunk aesthetics and seamless user experience.',
    tags: ['React', 'Next.js', 'Tailwind CSS'],
    image: '/images/project1.jpg',
    link: '#',
  },
  {
    id: 2,
    title: 'Digital Vortex',
    description: 'An interactive data visualization tool that transforms complex data into stunning visual narratives.',
    tags: ['TypeScript', 'D3.js', 'Node.js'],
    image: '/images/project2.jpg',
    link: '#',
  },
  {
    id: 3, 
    title: 'Neural Sync',
    description: 'AI-powered content management system with advanced machine learning algorithms.',
    tags: ['Python', 'TensorFlow', 'React'],
    image: '/images/project3.jpg',
    link: '#',
  },
  {
    id: 4,
    title: 'Cyber Grid',
    description: 'A responsive grid system designed specifically for futuristic user interfaces.',
    tags: ['CSS', 'JavaScript', 'Design System'],
    image: '/images/project4.jpg',
    link: '#',
  },
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-cyber-black">
      {/* Cyberpunk background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-pink opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyber-blue opacity-5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-cyber font-bold mb-6">
            <span className="neon-text-pink">My</span> Projects
          </h2>
          <div className="w-24 h-1 bg-cyber-pink mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-future">
            Explore my latest projects that showcase my skills and passion for building innovative digital solutions.
          </p>
        </motion.div>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="cyber-border bg-cyber-dark/60 overflow-hidden group"
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
              whileHover={{ 
                y: -10,
                boxShadow: activeProject === project.id 
                  ? '0 0 20px rgba(255, 0, 255, 0.5)' 
                  : '0 0 10px rgba(0, 240, 255, 0.3)'
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative overflow-hidden h-48 bg-gradient-to-br from-cyber-black to-cyber-dark">
                {/* Project image placeholder with cyberpunk grid */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="font-cyber text-2xl text-cyber-blue opacity-50">
                    {project.title.charAt(0)}
                  </div>
                  <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-px pointer-events-none opacity-20">
                    {Array.from({ length: 72 }).map((_, i) => (
                      <div key={i} className="bg-cyber-blue/20 border border-cyber-blue/10"></div>
                    ))}
                  </div>
                </div>
                
                {/* Project overlay with glitch effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <a 
                        href={project.link} 
                        className="cyber-button text-xs py-1 inline-block"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project
                      </a>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-cyber font-bold mb-2 neon-text">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 font-future text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs font-future px-2 py-1 rounded-sm bg-cyber-blue/10 text-cyber-blue"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <a href="#" className="cyber-button inline-block">
            View All Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 