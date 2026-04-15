import { useEffect, useRef } from 'react';

export default function PCBCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // Generate grid points
    const spacing = 60;
    const nodes = [];
    const traces = [];

    const cols = Math.ceil(canvas.width / spacing);
    const rows = Math.ceil(canvas.height / spacing);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (Math.random() > 0.7) {
          nodes.push({ x: i * spacing, y: j * spacing });
        }
      }
    }

    // Connect some nodes
    nodes.forEach(node1 => {
      nodes.forEach(node2 => {
        if (node1 !== node2) {
          const dx = Math.abs(node1.x - node2.x);
          const dy = Math.abs(node1.y - node2.y);
          
          if ((dx === spacing && dy === 0) || (dx === 0 && dy === spacing)) {
            if (Math.random() > 0.5) {
              traces.push({
                start: node1,
                end: node2,
                active: Math.random() > 0.8,
                pulsePos: Math.random()
              });
            }
          }
        }
      });
    });

    const draw = () => {
      ctx.fillStyle = '#050608'; // bg-dark
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw traces
      ctx.lineWidth = 1;
      traces.forEach(trace => {
        ctx.beginPath();
        ctx.moveTo(trace.start.x, trace.start.y);
        ctx.lineTo(trace.end.x, trace.end.y);
        ctx.strokeStyle = trace.active ? 'rgba(35, 110, 218, 0.4)' : 'rgba(255, 255, 255, 0.03)';
        ctx.stroke();

        // Draw pulse
        if (trace.active) {
          trace.pulsePos += 0.01;
          if (trace.pulsePos > 1) trace.pulsePos = 0;
          
          const px = trace.start.x + (trace.end.x - trace.start.x) * trace.pulsePos;
          const py = trace.start.y + (trace.end.y - trace.start.y) * trace.pulsePos;
          
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#67d9ff';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#67d9ff';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = '#8a9abc';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.6
      }} 
    />
  );
}
