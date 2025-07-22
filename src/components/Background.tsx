import React, { useEffect, useRef } from 'react';
import './Background.css';

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Liquid flow parameters
    const waves: Array<{
      amplitude: number;
      frequency: number;
      phase: number;
      speed: number;
      opacity: number;
      color: string;
    }> = [
      { amplitude: 60, frequency: 0.015, phase: 0, speed: 0.02, opacity: 0.1, color: '99, 102, 241' },
      { amplitude: 80, frequency: 0.012, phase: Math.PI / 3, speed: 0.015, opacity: 0.15, color: '139, 92, 246' },
      { amplitude: 100, frequency: 0.008, phase: Math.PI / 2, speed: 0.018, opacity: 0.2, color: '59, 130, 246' },
      { amplitude: 40, frequency: 0.02, phase: Math.PI, speed: 0.025, opacity: 0.25, color: '34, 197, 94' },
    ];

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }> = [];

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.2 + 0.1,
        color: ['99, 102, 241', '139, 92, 246', '59, 130, 246', '34, 197, 94'][Math.floor(Math.random() * 4)]
      });
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw liquid waves
      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        // Create multiple wave layers
        for (let x = 0; x <= canvas.width; x += 2) {
          const y1 = canvas.height * 0.7 + 
                     Math.sin(x * wave.frequency + wave.phase + time * wave.speed) * wave.amplitude +
                     Math.sin(x * wave.frequency * 2 + wave.phase + time * wave.speed * 0.7) * wave.amplitude * 0.5;

          if (x === 0) {
            ctx.moveTo(x, y1);
          } else {
            ctx.lineTo(x, y1);
          }
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, `rgba(${wave.color}, 0)`);
        gradient.addColorStop(0.5, `rgba(${wave.color}, ${wave.opacity})`);
        gradient.addColorStop(1, `rgba(${wave.color}, ${wave.opacity * 0.3})`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Draw floating particles
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Boundary check and reset
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = canvas.height + 10;
        if (particle.y > canvas.height + 10) particle.y = -10;

        // Draw particle with glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 3
        );
        gradient.addColorStop(0, `rgba(${particle.color}, ${particle.opacity})`);
        gradient.addColorStop(1, `rgba(${particle.color}, 0)`);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity * 2})`;
        ctx.fill();
      });

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="liquid-background">
      {/* Very subtle liquid background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-purple-500/6 to-green-500/8"
        style={{ 
          zIndex: -6,
          animation: 'pulse 8s ease-in-out infinite'
        }}
      />
      
      <canvas
        ref={canvasRef}
        className="liquid-canvas"
        style={{ background: 'transparent' }}
      />
      
      {/* SVG Overlay for additional effects */}
      <svg className="liquid-svg-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="liquidGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(99, 102, 241, 0.08)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.06)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.08)" />
          </linearGradient>
          <linearGradient id="liquidGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(34, 197, 94, 0.06)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.06)" />
          </linearGradient>
        </defs>
        
        <path className="liquid-path liquid-path-1" fill="url(#liquidGradient1)">
          <animate
            attributeName="d"
            dur="20s"
            repeatCount="indefinite"
            values="M0,30 C30,10 70,50 100,30 L100,100 L0,100 Z;
                    M0,50 C30,70 70,10 100,50 L100,100 L0,100 Z;
                    M0,30 C30,10 70,50 100,30 L100,100 L0,100 Z"
          />
        </path>
        
        <path className="liquid-path liquid-path-2" fill="url(#liquidGradient2)">
          <animate
            attributeName="d"
            dur="25s"
            repeatCount="indefinite"
            values="M0,70 C30,90 70,30 100,70 L100,100 L0,100 Z;
                    M0,40 C30,20 70,80 100,40 L100,100 L0,100 Z;
                    M0,70 C30,90 70,30 100,70 L100,100 L0,100 Z"
          />
        </path>
      </svg>

      {/* Floating orbs */}
      <div className="floating-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
        <div className="orb orb-5"></div>
      </div>
    </div>
  );
};

export default Background;