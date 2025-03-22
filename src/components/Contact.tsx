'use client';

import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };
  
  const socialLinks = [
    { name: 'GitHub', icon: 'github', url: 'https://github.com' },
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com' },
    { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com' },
    { name: 'Instagram', icon: 'instagram', url: 'https://instagram.com' },
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-cyber-dark">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00f0ff" strokeWidth="0.5" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-cyber font-bold mb-6">
            <span className="neon-text">Contact</span> Me
          </h2>
          <div className="w-24 h-1 bg-cyber-blue mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-future">
            Have a project in mind or want to collaborate? Feel free to reach out and let's create something amazing together.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8">
          <motion.div 
            className="md:col-span-3 cyber-border p-6 bg-cyber-black/40"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {isSubmitted ? (
              <motion.div 
                className="text-center py-12"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4 text-cyber-blue">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
                    <path d="M22 11.0857V12.0057C21.9988 14.1621 21.3005 16.2604 20.0093 17.9875C18.7182 19.7147 16.9033 20.9782 14.8354 21.5896C12.7674 22.201 10.5573 22.1276 8.53447 21.3803C6.51168 20.633 4.78465 19.2518 3.61096 17.4428C2.43727 15.6338 1.87979 13.4938 2.02168 11.342C2.16356 9.19029 2.99721 7.14205 4.39828 5.5028C5.79935 3.86354 7.69279 2.72111 9.79619 2.24587C11.8996 1.77063 14.1003 1.98806 16.07 2.86572" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 4L12 14.01L9 11.01" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-cyber neon-text mb-2">Message Sent Successfully!</h3>
                <p className="text-gray-300 font-future">Thank you for reaching out. I'll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="text-2xl font-cyber neon-text mb-6">Send a Message</h3>
                
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-300 mb-2 font-future">Name</label>
                  <div className="relative cyber-border">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-transparent text-white focus:outline-none font-future"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-300 mb-2 font-future">Email</label>
                  <div className="relative cyber-border">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-transparent text-white focus:outline-none font-future"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-300 mb-2 font-future">Message</label>
                  <div className="relative cyber-border">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-2 bg-transparent text-white focus:outline-none resize-none font-future"
                      required
                    ></textarea>
                  </div>
                </div>
                
                <motion.button
                  type="submit"
                  className={`cyber-button ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            )}
          </motion.div>
          
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="cyber-border p-6 bg-cyber-black/40 mb-6">
              <h3 className="text-2xl font-cyber neon-text-pink mb-6">Connect</h3>
              
              <div className="space-y-4 font-future">
                <div className="flex items-center gap-3">
                  <div className="text-cyber-pink">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" stroke="#ff00ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 7L13.03 12.7C12.7213 12.8934 12.3643 13.0001 12 13.0001C11.6357 13.0001 11.2787 12.8934 10.97 12.7L2 7" stroke="#ff00ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-gray-300">contact@amriksingh.com</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-cyber-pink">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.9999 16.9201V19.9201C22.0011 20.1986 21.944 20.4743 21.8324 20.7294C21.7209 20.9846 21.5572 21.2137 21.352 21.402C21.1468 21.5902 20.9045 21.7336 20.6407 21.8228C20.3769 21.912 20.0973 21.9452 19.8199 21.9201C16.7428 21.5857 13.7869 20.5342 11.1899 18.8501C8.77376 17.3148 6.72527 15.2663 5.18993 12.8501C3.49991 10.2413 2.44818 7.27109 2.11993 4.1801C2.09494 3.90356 2.12781 3.62486 2.21643 3.36172C2.30506 3.09859 2.4475 2.85679 2.63477 2.65172C2.82204 2.44665 3.05012 2.28281 3.30429 2.17062C3.55846 2.05843 3.8332 2.00036 4.10993 2.0001H7.10993C7.59524 1.99532 8.06572 2.16718 8.43369 2.48363C8.80166 2.80008 9.04201 3.23954 9.10993 3.7201C9.23656 4.68016 9.47138 5.62282 9.80993 6.5301C9.94448 6.88802 9.9736 7.27701 9.89384 7.65098C9.81408 8.02494 9.6288 8.36821 9.35993 8.6401L8.08993 9.9101C9.51349 12.4136 11.5864 14.4865 14.0899 15.9101L15.3599 14.6401C15.6318 14.3712 15.9751 14.1859 16.3491 14.1062C16.723 14.0264 17.112 14.0556 17.4699 14.1901C18.3772 14.5286 19.3199 14.7635 20.2799 14.8901C20.7657 14.9586 21.2093 15.2033 21.5265 15.5776C21.8436 15.9519 22.0121 16.4297 21.9999 16.9201Z" stroke="#ff00ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-cyber-pink">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#ff00ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#ff00ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-gray-300">San Francisco, CA</span>
                </div>
              </div>
            </div>
            
            <div className="cyber-border p-6 bg-cyber-black/40">
              <h3 className="text-xl font-cyber neon-text-pink mb-4">Follow Me</h3>
              
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center border border-cyber-pink text-cyber-pink rounded-sm"
                    whileHover={{ 
                      scale: 1.1, 
                      backgroundColor: 'rgba(255, 0, 255, 0.1)',
                      boxShadow: '0 0 8px rgba(255, 0, 255, 0.5)'
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="sr-only">{social.name}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.374 0 0 5.374 0 12C0 18.626 5.374 24 12 24C18.626 24 24 18.626 24 12C24 5.374 18.626 0 12 0Z" fill="#ff00ff" fillOpacity="0.2"/>
                      <text x="12" y="16" textAnchor="middle" fontSize="8" fill="#ff00ff">{social.icon[0].toUpperCase()}</text>
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="mt-20 border-t border-cyber-blue/20 pt-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400 font-future">
          <p>© {new Date().getFullYear()} Amrik Singh. All Rights Reserved.</p>
          <p className="mt-2">Designed and built with <span className="text-cyber-pink">♥</span></p>
        </div>
      </div>
    </section>
  );
};

export default Contact; 