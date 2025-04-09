'use client';

import { useEffect, useRef, memo } from 'react';

interface SectionStarsProps {
  sectionId: string;
}

const SectionStars = memo(({ sectionId }: SectionStarsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;
    
    // Request high-performance rendering
    if (typeof canvas.style.translate !== 'undefined') {
      canvas.style.translate = '0px 0px';
      canvas.style.willChange = 'transform';
    }
    
    // Resize observer to handle section size changes
    const resizeObserver = new ResizeObserver(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
      }
    });
    
    const section = document.getElementById(sectionId);
    if (section) {
      resizeObserver.observe(section);
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    }
    
    // Get initial canvas dimensions for stars
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Star object - simplified
    class Star {
      x: number;
      y: number;
      size: number;
      speed: number;
      color: string;
      tailLength: number;
      
      constructor() {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight * 0.3; // Start in top third
        this.size = Math.random() * 1.2 + 0.3; // Smaller stars
        this.speed = Math.random() * 1.5 + 0.3; // Slower speed
        this.color = this.getRandomColor();
        this.tailLength = Math.floor(Math.random() * 7) + 2; // Shorter tails
      }
      
      getRandomColor() {
        const colors = [
          'rgba(0, 240, 255, 0.4)', // Cyber blue - more transparent
          'rgba(255, 0, 255, 0.4)',  // Cyber pink - more transparent
          'rgba(255, 255, 255, 0.5)' // White - more transparent
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        this.y += this.speed;
        
        // Reset if it goes off screen
        if (this.y > canvasHeight) {
          this.y = 0;
          this.x = Math.random() * canvasWidth;
          this.speed = Math.random() * 1.5 + 0.3;
        }
      }
      
      draw() {
        if (!ctx) return;
        
        // Draw tail
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y - this.tailLength);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size / 2;
        ctx.stroke();
        
        // Draw star
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    // Create stars - even fewer for performance
    const stars: Star[] = [];
    const starCount = Math.min(Math.floor(window.innerWidth / 100), 10);
    
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }
    
    // Animation frame rate control - even lower FPS
    let lastTime = 0;
    const fps = 15; // Lower FPS for better performance
    const interval = 1000 / fps;
    
    // Animation loop
    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastTime;
      
      if (deltaTime > interval) {
        lastTime = timestamp - (deltaTime % interval);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw stars
        stars.forEach(star => {
          star.update();
          star.draw();
        });
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    let animationId = requestAnimationFrame(animate);
    
    // Intersection Observer to pause animation when section is not visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Resume animation when section is visible
          if (!animationId) {
            animationId = requestAnimationFrame(animate);
          }
        } else {
          // Pause animation when section is not visible
          if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = 0;
          }
        }
      });
    }, { threshold: 0.05 }); // Start animation when only 5% of section is visible
    
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (section) {
        observer.unobserve(section);
        resizeObserver.unobserve(section);
      }
    };
  }, [sectionId]);
  
  return (
    <canvas 
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-15 motion-reduced"
      style={{ 
        background: 'transparent',
        transform: 'translateZ(0)'
      }}
      aria-hidden="true"
    />
  );
});

SectionStars.displayName = 'SectionStars';
export default SectionStars; 