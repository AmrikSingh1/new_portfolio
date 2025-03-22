'use client';

import React from 'react';
import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

// Skills with cyberpunk styling
const skills = [
  { name: 'JavaScript', level: 90 },
  { name: 'React', level: 85 },
  { name: 'Next.js', level: 80 },
  { name: 'TypeScript', level: 75 },
  { name: 'Node.js', level: 70 },
  { name: 'UI/UX Design', level: 80 },
];

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-cyber-dark">
      {/* Cyberpunk decorative patterns */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-1 bg-cyber-blue"></div>
        <div className="absolute top-10 left-0 w-1/3 h-1 bg-cyber-pink"></div>
        <div className="absolute top-20 right-0 w-1/4 h-1 bg-cyber-purple"></div>
        <div className="absolute bottom-0 right-0 w-full h-1 bg-cyber-blue"></div>
        <div className="absolute bottom-10 right-0 w-1/2 h-1 bg-cyber-pink"></div>
        <div className="absolute bottom-20 left-0 w-1/5 h-1 bg-cyber-purple"></div>
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <h2 className="text-4xl font-cyber font-bold mb-6">
              <span className="neon-text">About</span> Me
            </h2>
            <div className="w-24 h-1 bg-cyber-blue mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg font-future leading-relaxed">
              I'm a passionate developer with a knack for creating cutting-edge digital experiences. My journey in the world of programming began in my teens, and since then I've been on a constant quest to learn and evolve with technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="order-2 md:order-1">
              <h3 className="text-2xl font-cyber font-bold mb-6 neon-text-pink">My Skills</h3>
              
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-future text-white">{skill.name}</span>
                      <span className="font-future text-cyber-blue">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-cyber-black rounded-full overflow-hidden cyber-border">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-cyber-blue to-cyber-pink"
                        initial={{ width: 0 }}
                        animate={{ width: isInView ? `${skill.level}%` : 0 }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="order-1 md:order-2 cyber-border p-6 bg-cyber-black/40">
              <h3 className="text-2xl font-cyber font-bold mb-6 neon-text">My Journey</h3>
              <div className="space-y-4 font-future">
                <p className="text-gray-300">
                  With a background in computer science and a passion for design, I blend technical expertise with creativity to build engaging digital solutions.
                </p>
                <p className="text-gray-300">
                  I specialize in creating responsive web applications using modern technologies like React, Next.js, and Node.js. I'm also experienced in UI/UX design, ensuring that my projects are not only functional but also intuitive and visually appealing.
                </p>
                <p className="text-gray-300">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or expanding my knowledge through continuous learning.
                </p>
              </div>
              
              <motion.a 
                href="#contact"
                className="cyber-button inline-block mt-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 