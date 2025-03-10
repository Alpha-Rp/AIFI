
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  pulse: boolean;
  pulseSpeed: number;
  maxOpacity: number;
  minOpacity: number;
}

interface MousePosition {
  x: number;
  y: number;
  isMoving: boolean;
  timeout?: NodeJS.Timeout;
}

export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0, isMoving: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to be full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { 
        x: e.clientX, 
        y: e.clientY, 
        isMoving: true 
      };
      
      // Set a timeout to detect when mouse stops moving
      if (mouseRef.current.timeout) {
        clearTimeout(mouseRef.current.timeout);
      }
      
      mouseRef.current.timeout = setTimeout(() => {
        if (mouseRef.current) {
          mouseRef.current.isMoving = false;
        }
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Create particles - reduced count for more professional look
    const particleCount = Math.min(Math.floor(window.innerWidth / 25), 50);
    
    const particles: Particle[] = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.3, // Smaller, more subtle particles
      speedX: (Math.random() - 0.5) * 0.15, // Slower movement
      speedY: (Math.random() - 0.5) * 0.15, // Slower movement
      color: Math.random() > 0.8 ? '#00B4D8' : Math.random() > 0.7 ? '#39FF14' : '#FFFFFF',
      opacity: Math.random() * 0.3 + 0.05, // Lower opacity
      pulse: Math.random() > 0.8, // Fewer pulsing particles
      pulseSpeed: Math.random() * 0.01 + 0.003, // Slower pulse
      maxOpacity: Math.random() * 0.3 + 0.2,
      minOpacity: Math.random() * 0.1 + 0.02,
    }));

    const animate = () => {
      if (!ctx || !canvas) return;

      // Create subtle fading effect - more transparent for professional look
      ctx.fillStyle = 'rgba(10, 25, 47, 0.4)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        // Pulse effect
        if (particle.pulse) {
          particle.opacity += particle.pulseSpeed;
          if (particle.opacity > particle.maxOpacity || particle.opacity < particle.minOpacity) {
            particle.pulseSpeed = -particle.pulseSpeed;
          }
        }

        // Mouse interaction - more subtle
        if (mouseRef.current.isMoving) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 100; // Smaller influence radius
          
          if (distance < maxDistance) {
            // Gentler repulsion
            const force = (maxDistance - distance) / maxDistance;
            particle.speedX -= (dx / distance) * force * 0.2;
            particle.speedY -= (dy / distance) * force * 0.2;
          }
        }

        // Lower max speed for more controlled movement
        const maxSpeed = 0.8;
        const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
        if (speed > maxSpeed) {
          particle.speedX = (particle.speedX / speed) * maxSpeed;
          particle.speedY = (particle.speedY / speed) * maxSpeed;
        }

        // Higher friction for smoother, more controlled movement
        particle.speedX *= 0.95;
        particle.speedY *= 0.95;

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around the screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with reduced glow for more professional look
        ctx.save();
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(')', `,${particle.opacity})`).replace('rgb', 'rgba');
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 8; // Less blur
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none opacity-70 -z-20"
    />
  );
};
