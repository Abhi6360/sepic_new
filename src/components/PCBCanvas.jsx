import { useEffect, useRef, useState } from 'react';

const SPACING = 70;
const PULSE_SPEED = 0.006;

export default function PCBCanvas({ mouseX = 0, mouseY = 0 }) {
  const canvasRef = useRef(null);
  const dataRef = useRef({ nodes: [], traces: [], animId: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    function buildGrid() {
      const cols = Math.ceil(canvas.width / SPACING) + 2;
      const rows = Math.ceil(canvas.height / SPACING) + 2;
      const nodes = [];
      const traces = [];

      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          if (Math.random() > 0.62) {
            nodes.push({ x: i * SPACING, y: j * SPACING, glow: Math.random() > 0.85 });
          }
        }
      }

      nodes.forEach((n1, idx) => {
        nodes.forEach((n2, idx2) => {
          if (idx >= idx2) return;
          const dx = Math.abs(n1.x - n2.x);
          const dy = Math.abs(n1.y - n2.y);
          if ((dx === SPACING && dy === 0) || (dx === 0 && dy === SPACING)) {
            if (Math.random() > 0.42) {
              traces.push({
                start: n1, end: n2,
                active: Math.random() > 0.72,
                pulsePos: Math.random(),
                speed: PULSE_SPEED * (0.6 + Math.random() * 0.8),
                bright: Math.random() > 0.88,
              });
            }
          }
        });
      });

      dataRef.current.nodes = nodes;
      dataRef.current.traces = traces;
    }

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      buildGrid();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    resize();

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { nodes, traces } = dataRef.current;

      // Traces
      traces.forEach(trace => {
        ctx.beginPath();
        ctx.moveTo(trace.start.x, trace.start.y);
        ctx.lineTo(trace.end.x, trace.end.y);
        if (trace.active) {
          ctx.strokeStyle = trace.bright ? 'rgba(35,110,218,0.28)' : 'rgba(35,110,218,0.14)';
          ctx.lineWidth = trace.bright ? 1.2 : 0.8;
        } else {
          ctx.strokeStyle = 'rgba(255,255,255,0.028)';
          ctx.lineWidth = 0.7;
        }
        ctx.stroke();

        if (trace.active) {
          trace.pulsePos += trace.speed;
          if (trace.pulsePos > 1.15) trace.pulsePos = -0.15;

          const t = Math.max(0, Math.min(1, trace.pulsePos));
          const px = trace.start.x + (trace.end.x - trace.start.x) * t;
          const py = trace.start.y + (trace.end.y - trace.start.y) * t;

          const r = ctx.createRadialGradient(px, py, 0, px, py, trace.bright ? 7 : 4);
          r.addColorStop(0, trace.bright ? 'rgba(103,217,255,0.85)' : 'rgba(95,156,255,0.65)');
          r.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(px, py, trace.bright ? 7 : 4, 0, Math.PI * 2);
          ctx.fillStyle = r;
          ctx.fill();
        }
      });

      // Nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.glow ? 3 : 1.8, 0, Math.PI * 2);
        ctx.fillStyle = node.glow ? 'rgba(103,217,255,0.55)' : 'rgba(255,255,255,0.12)';
        ctx.fill();

        if (node.glow) {
          const g = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 12);
          g.addColorStop(0, 'rgba(103,217,255,0.18)');
          g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }
      });

      dataRef.current.animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(dataRef.current.animId);
    };
  }, []);

  // Subtle parallax offset applied via CSS transform
  const px = mouseX * 0.35;
  const py = mouseY * 0.25;

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          opacity: 0.75,
          transform: `translate(${px}px, ${py}px) scale(1.04)`,
          transition: 'transform 0.12s ease-out',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
