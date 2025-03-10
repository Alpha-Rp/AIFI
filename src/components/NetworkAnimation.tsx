
import { useEffect, useRef } from 'react';
import { useMousePosition } from '@/lib/animation';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  pulseSpeed: number;
  pulseAmount: number;
  originalRadius: number;
}

interface Connection {
  from: number;
  to: number;
  alpha: number;
}

export const NetworkAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useMousePosition();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Create nodes
    const nodeCount = Math.min(Math.floor(window.innerWidth / 30), 120); // More nodes
    const nodes: Node[] = Array.from({ length: nodeCount }).map(() => {
      const radius = Math.random() * 2 + 1;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius,
        originalRadius: radius,
        color: Math.random() > 0.7 ? '#00B4D8' : Math.random() > 0.5 ? '#39FF14' : '#FFFFFF',
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseAmount: Math.random() * 0.5 + 0.5
      };
    });

    // Track connections between nodes
    const connections: Connection[] = [];
    const connectionDistance = Math.min(canvas.width, canvas.height) * 0.17; // Slightly longer connections

    const isInView = (node: Node): boolean => {
      return node.x >= -100 && node.x <= canvas.width + 100 && 
             node.y >= -100 && node.y <= canvas.height + 100;
    };

    const updateConnections = () => {
      connections.length = 0;
      
      for (let i = 0; i < nodes.length; i++) {
        if (!isInView(nodes[i])) continue;
        
        for (let j = i + 1; j < nodes.length; j++) {
          if (!isInView(nodes[j])) continue;
          
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            connections.push({
              from: i,
              to: j,
              alpha: 1 - distance / connectionDistance
            });
          }
        }
      }
    };

    // Mouse interaction
    let mouseNode: Node | null = null;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let mouseSpeed = 0;
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate mouse speed for interaction intensity
      const mouseSpeedX = Math.abs(mousePosition.x - lastMouseX);
      const mouseSpeedY = Math.abs(mousePosition.y - lastMouseY);
      mouseSpeed = Math.min(10, (mouseSpeedX + mouseSpeedY) / 2);
      lastMouseX = mousePosition.x;
      lastMouseY = mousePosition.y;
      
      // Update mouse node position if mouse is on canvas
      if (mousePosition.x > 0 && mousePosition.y > 0) {
        if (!mouseNode) {
          mouseNode = {
            x: mousePosition.x,
            y: mousePosition.y,
            vx: 0,
            vy: 0,
            radius: 0, // Invisible node
            originalRadius: 0,
            color: '#00B4D8',
            pulseSpeed: 0,
            pulseAmount: 0
          };
          nodes.push(mouseNode);
        } else {
          mouseNode.x = mousePosition.x;
          mouseNode.y = mousePosition.y;
        }
      }
      
      // Update node positions with pulsing effect
      nodes.forEach((node, index) => {
        if (node === mouseNode) return;
        
        // Pulsing radius effect
        node.radius = node.originalRadius + Math.sin(Date.now() * node.pulseSpeed) * node.pulseAmount;
        
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges with damping
        if (node.x < 0) {
          node.x = 0;
          node.vx *= -0.8;
        } else if (node.x > canvas.width) {
          node.x = canvas.width;
          node.vx *= -0.8;
        }
        
        if (node.y < 0) {
          node.y = 0;
          node.vy *= -0.8;
        } else if (node.y > canvas.height) {
          node.y = canvas.height;
          node.vy *= -0.8;
        }
        
        // Attraction to mouse with intensity based on mouse speed
        if (mouseNode) {
          const dx = mouseNode.x - node.x;
          const dy = mouseNode.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance * 2 && distance > 5) {
            const intensity = 0.02 + (mouseSpeed * 0.003);
            node.vx += (dx / distance) * intensity;
            node.vy += (dy / distance) * intensity;
          }
        }
        
        // Apply friction
        node.vx *= 0.98;
        node.vy *= 0.98;
        
        // Max speed
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        const maxSpeed = 1.5;
        if (speed > maxSpeed) {
          node.vx = (node.vx / speed) * maxSpeed;
          node.vy = (node.vy / speed) * maxSpeed;
        }
      });
      
      // Update connections
      updateConnections();
      
      // Draw connections with glow
      connections.forEach(connection => {
        const fromNode = nodes[connection.from];
        const toNode = nodes[connection.to];
        
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        
        // Gradient based on whether one end is the mouse node
        if (connection.from === nodes.length - 1 || connection.to === nodes.length - 1) {
          ctx.strokeStyle = `rgba(0, 180, 216, ${connection.alpha * (1 + mouseSpeed * 0.1)})`;
          ctx.lineWidth = 1.5;
          // Add glow effect for mouse-connected lines
          ctx.shadowColor = '#00B4D8';
          ctx.shadowBlur = 5 + mouseSpeed;
        } else {
          ctx.strokeStyle = `rgba(255, 255, 255, ${connection.alpha * 0.5})`;
          ctx.lineWidth = 0.5;
          ctx.shadowBlur = 0;
        }
        
        ctx.stroke();
        ctx.shadowBlur = 0; // Reset shadow for other elements
      });
      
      // Draw nodes with glow for highlighted ones
      nodes.forEach((node, index) => {
        if (node === mouseNode) return;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        
        // Nodes connected to mouse are highlighted with glow
        const isConnectedToMouse = mouseNode && connections.some(conn => 
          (conn.from === index && conn.to === nodes.length - 1) || 
          (conn.to === index && conn.from === nodes.length - 1)
        );
        
        if (isConnectedToMouse) {
          ctx.fillStyle = node.color;
          ctx.shadowColor = node.color;
          ctx.shadowBlur = 8 + mouseSpeed;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, 0.7)`;
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow
      });
      
      requestAnimationFrame(animate);
    };
    
    const animationFrame = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, [mousePosition]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full -z-10"
    />
  );
};
