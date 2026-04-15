import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

export default function ServiceCard({ num, title, description, link, img }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden', cursor: 'default' }}>

      {/* image */}
      {img && (
        <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
          <motion.img
            src={img}
            alt={title}
            animate={{ scale: hovered ? 1.06 : 1, filter: hovered ? 'grayscale(20%) brightness(0.7)' : 'grayscale(60%) brightness(0.5)' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-dark) 10%, transparent 70%)' }} />
        </div>
      )}

      <div style={{ padding: '1.75rem 2rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.3 }}>{title}</h3>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(138,154,188,0.4)', flexShrink: 0, paddingLeft: '0.5rem' }}>{num}</span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>{description}</p>
        <Link href={link} className="card-link">Explore Service</Link>
      </div>

      {/* animated left border on hover */}
      <motion.div
        animate={{ height: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{ position: 'absolute', top: 0, left: 0, width: '2px', background: 'linear-gradient(to bottom, var(--electric-blue), var(--cyan))', transformOrigin: 'top' }} />

      {/* top glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, var(--electric-blue), transparent)' }} />
    </motion.div>
  );
}
