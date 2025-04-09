import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import SectionStars from './SectionStars';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [hoverField, setHoverField] = useState<string | null>(null);
  const [isGridCreated, setIsGridCreated] = useState(false);
  
  // For grid effect
  const gridRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for subtle parallax effects - initialized to center
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  // Reduced motion range for stability
  const formX = useTransform(mouseX, [0, 1], [-1.5, 1.5]);
  const formY = useTransform(mouseY, [0, 1], [-1.5, 1.5]);
  
  // Debounced mouse movement handler
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const bounds = containerRef.current.getBoundingClientRect();
    
    // Throttle the updates for better performance
    // Only update if the mouse has moved significantly
    const newX = (clientX - bounds.left) / bounds.width;
    const newY = (clientY - bounds.top) / bounds.height;
    
    if (Math.abs(newX - mouseX.get()) > 0.03 || Math.abs(newY - mouseY.get()) > 0.03) {
      mouseX.set(newX);
      mouseY.set(newY);
    }
  }, [mouseX, mouseY]);

  // Create cyberpunk grid effect - memoized with useCallback
  const createGrid = useCallback(() => {
    if (!gridRef.current || !containerRef.current || isGridCreated) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const width = container.width;
    const height = container.height;
    
    // Clear previous grid
    while (gridRef.current.firstChild) {
      gridRef.current.removeChild(gridRef.current.firstChild);
    }
    
    // Create grid lines with less intensive styling
    const createLine = (start: [number, number], end: [number, number], color: string, delay: number) => {
      const line = document.createElement('div');
      const length = Math.sqrt(
        Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2)
      );
      const angle = Math.atan2(end[1] - start[1], end[0] - start[0]) * (180 / Math.PI);
      
      line.style.position = 'absolute';
      line.style.width = `${length}px`;
      line.style.height = '1px';
      line.style.backgroundColor = color;
      line.style.opacity = '0';
      line.style.top = `${start[1]}px`;
      line.style.left = `${start[0]}px`;
      line.style.transform = `rotate(${angle}deg)`;
      line.style.transformOrigin = '0 0';
      line.style.transition = 'opacity 1s ease';
      
      // Animate line appearing with delay
      setTimeout(() => {
        if (line) {
          line.style.opacity = '0.08'; // Lower opacity for subtlety
        }
      }, delay);
      
      return line;
    };
    
    // Setup grid fragment to minimize DOM operations
    const fragment = document.createDocumentFragment();
    
    // Add horizontal lines
    for (let i = 0; i < 4; i++) { // Reduced from 5 to 4
      const y = (height / 5) * (i + 1);
      const line = createLine([0, y], [width, y], '#00f0ff', i * 200); // Slower appearance
      fragment.appendChild(line);
    }
    
    // Add vertical lines
    for (let i = 0; i < 4; i++) { // Reduced from 5 to 4
      const x = (width / 5) * (i + 1);
      const line = createLine([x, 0], [x, height], '#ff00ff', 800 + i * 200); // Slower appearance
      fragment.appendChild(line);
    }
    
    // Add diagonal lines
    for (let i = 0; i < 2; i++) { // Reduced from 3 to 2
      const startX = (width / 3) * i;
      const startY = 0;
      const endX = width;
      const endY = (height / 2) * (i + 1);
      const line = createLine([startX, startY], [endX, endY], '#b967ff', 1600 + i * 200); // Slower appearance
      fragment.appendChild(line);
    }
    
    // Add all lines at once to minimize reflows
    gridRef.current.appendChild(fragment);
    setIsGridCreated(true);
    
    // Animation for random grid glitches - less frequent
    const animateGridPulse = () => {
      if (!gridRef.current) return;
      
      const lines = gridRef.current.childNodes;
      if (lines.length === 0) return;
      
      const randomLine = lines[Math.floor(Math.random() * lines.length)] as HTMLDivElement;
      
      if (randomLine) {
        randomLine.style.opacity = '0.25';
        randomLine.style.filter = 'blur(0.5px)';
        
        setTimeout(() => {
          if (randomLine) {
            randomLine.style.opacity = '0.08'; // Back to normal opacity
            randomLine.style.filter = 'blur(0)';
          }
        }, 400);
      }
      
      pulseTimeoutId = setTimeout(animateGridPulse, Math.random() * 4000 + 2000); // Much less frequent
    };
    
    let pulseTimeoutId = setTimeout(animateGridPulse, 3000); // Start after initial grid is visible
    
    // Handle resize events for responsive grid
    const handleResize = () => {
      if (containerRef.current && gridRef.current) {
        const newBounds = containerRef.current.getBoundingClientRect();
        if (Math.abs(newBounds.width - width) > 50 || Math.abs(newBounds.height - height) > 50) {
          setIsGridCreated(false); // Mark for recreation on next cycle
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(pulseTimeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isGridCreated]);

  // Create grid on initial render, with IntersectionObserver
  useEffect(() => {
    if (!gridRef.current || !containerRef.current) return;
    
    // Use IntersectionObserver to only build grid when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isGridCreated) {
          // Delay grid creation for smoother initial appearance
          setTimeout(() => {
            createGrid();
          }, 300);
        }
      });
    }, { threshold: 0.2 }); // Only when 20% visible
    
    observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [createGrid, isGridCreated]);

  // Recreate grid when marked for recreation
  useEffect(() => {
    if (!isGridCreated) {
      createGrid();
    }
  }, [isGridCreated, createGrid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Send data to our API endpoint, which will save to Firebase
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 bg-cyber-dark text-white overflow-hidden optimized-animations">
      <SectionStars sectionId="contact" />
      
      <div ref={containerRef} className="container mx-auto px-4 relative z-10" onMouseMove={handleMouseMove}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto relative motion-reduced"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-cyber font-bold mb-4 relative inline-block hardware-accelerated">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-pink">
                C<span className="text-cyber-blue">0</span>NTACT
              </span>
              <div className="absolute inset-0 bg-cyber-blue opacity-20 blur-sm -z-10"></div>
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-cyber-blue to-cyber-pink mx-auto my-6 relative">
              <div className="absolute w-full h-full bg-cyber-blue opacity-50 blur-sm"></div>
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto font-future">
              Ready to connect? Drop me a transmission and I'll respond ASAP.
            </p>
          </div>
          
          <div ref={gridRef} className="absolute inset-0 pointer-events-none z-0 hardware-accelerated opacity-70"></div>
          
          <motion.div 
            className="cyber-border bg-cyber-black/80 backdrop-blur-md p-8 rounded relative overflow-hidden motion-reduced"
            style={{ x: formX, y: formY }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            {/* Neon border glow effect */}
            <div className="absolute inset-0 border border-cyber-blue opacity-40"></div>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyber-blue to-transparent shadow-neon-blue"></div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyber-pink to-transparent shadow-neon-pink"></div>
            <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-cyber-blue to-transparent shadow-neon-blue"></div>
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-cyber-pink to-transparent shadow-neon-pink"></div>
            
            {submitStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8 relative z-10"
              >
                <FiCheckCircle className="w-16 h-16 text-cyber-blue mx-auto mb-4" />
                <h3 className="text-2xl font-cyber font-bold mb-2 text-cyber-blue">TRANSMISSION RECEIVED</h3>
                <p className="text-gray-300 mb-6 font-future">Your message has been encrypted and stored. I'll decrypt it soon.</p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="cyber-button inline-flex items-center"
                >
                  SEND NEW TRANSMISSION
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div 
                    className="relative"
                    onMouseEnter={() => setHoverField('name')}
                    onMouseLeave={() => setHoverField(null)}
                  >
                    <label htmlFor="name" className="block text-sm font-cyber text-gray-300 mb-1">
                      NAME<span className="text-cyber-pink ml-1">:</span>
                    </label>
                    <div className={`relative ${hoverField === 'name' ? 'shadow-neon-blue' : ''} transition-shadow duration-300`}>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-cyber-black border border-cyber-blue/30 focus:border-cyber-blue rounded-none font-future text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyber-blue"
                        placeholder="ENTER YOUR NAME"
                      />
                      {hoverField === 'name' && (
                        <div className="absolute inset-0 border border-cyber-blue opacity-50 blur-[0.5px] -z-10"></div>
                      )}
                    </div>
                  </div>
                  
                  <div 
                    className="relative"
                    onMouseEnter={() => setHoverField('email')}
                    onMouseLeave={() => setHoverField(null)}
                  >
                    <label htmlFor="email" className="block text-sm font-cyber text-gray-300 mb-1">
                      EMAIL<span className="text-cyber-pink ml-1">:</span>
                    </label>
                    <div className={`relative ${hoverField === 'email' ? 'shadow-neon-blue' : ''} transition-shadow duration-300`}>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-cyber-black border border-cyber-blue/30 focus:border-cyber-blue rounded-none font-future text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyber-blue"
                        placeholder="ENTER YOUR EMAIL"
                      />
                      {hoverField === 'email' && (
                        <div className="absolute inset-0 border border-cyber-blue opacity-50 blur-[0.5px] -z-10"></div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div 
                  className="relative"
                  onMouseEnter={() => setHoverField('subject')}
                  onMouseLeave={() => setHoverField(null)}
                >
                  <label htmlFor="subject" className="block text-sm font-cyber text-gray-300 mb-1">
                    SUBJECT<span className="text-cyber-pink ml-1">:</span>
                  </label>
                  <div className={`relative ${hoverField === 'subject' ? 'shadow-neon-blue' : ''} transition-shadow duration-300`}>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-cyber-black border border-cyber-blue/30 focus:border-cyber-blue rounded-none font-future text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyber-blue"
                      placeholder="TRANSMISSION TOPIC"
                    />
                    {hoverField === 'subject' && (
                      <div className="absolute inset-0 border border-cyber-blue opacity-50 blur-[0.5px] -z-10"></div>
                    )}
                  </div>
                </div>
                
                <div 
                  className="relative"
                  onMouseEnter={() => setHoverField('message')}
                  onMouseLeave={() => setHoverField(null)}
                >
                  <label htmlFor="message" className="block text-sm font-cyber text-gray-300 mb-1">
                    MESSAGE<span className="text-cyber-pink ml-1">:</span>
                  </label>
                  <div className={`relative ${hoverField === 'message' ? 'shadow-neon-blue' : ''} transition-shadow duration-300`}>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-cyber-black border border-cyber-blue/30 focus:border-cyber-blue rounded-none font-future text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-1 focus:ring-cyber-blue"
                      placeholder="COMPOSE YOUR MESSAGE HERE..."
                    ></textarea>
                    {hoverField === 'message' && (
                      <div className="absolute inset-0 border border-cyber-blue opacity-50 blur-[0.5px] -z-10"></div>
                    )}
                  </div>
                </div>
                
                {submitStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-cyber-black border border-cyber-pink text-cyber-pink px-4 py-3 rounded-none flex items-start"
                  >
                    <FiAlertCircle className="h-5 w-5 mr-2 mt-0.5" />
                    <span className="font-future">ERROR: {errorMessage || 'Transmission failed. Please try again.'}</span>
                  </motion.div>
                )}
                
                <div className="text-right mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`cyber-button font-cyber inline-flex items-center relative overflow-hidden group ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-cyber-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        PROCESSING...
                      </>
                    ) : (
                      <>
                        <FiSend className="mr-2" />
                        TRANSMIT_MESSAGE
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 