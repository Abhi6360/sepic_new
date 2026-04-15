import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PageTemplate({ heroTitle, heroLabel, heroImg, children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '80px' }}>
      <section style={{
        position: 'relative',
        padding: '8rem 0 6rem',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden',
      }}>
        {/* Background image */}
        {heroImg && (
          <div style={{
            position: 'absolute', top: 0, right: 0,
            width: '55%', height: '100%',
            backgroundImage: `url(${heroImg})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            filter: 'grayscale(60%) brightness(0.4)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 100%)',
          }} />
        )}
        {/* gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--bg-dark) 30%, transparent 100%)' }} />
        {/* scan line */}
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
          style={{ position: 'absolute', top: 0, bottom: 0, width: '20%', background: 'linear-gradient(to right, transparent, rgba(103,217,255,0.03), transparent)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div style={{ maxWidth: '760px' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            {heroLabel && (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1.25rem' }}>
                {heroLabel}
              </p>
            )}
            <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 700 }}>
              {heroTitle}
            </h1>
          </motion.div>
        </div>
      </section>

      {children}

      <section style={{ padding: '6rem 0', background: 'var(--surface-primary)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: '1.25rem', fontWeight: 700 }}>Ready to review your layout?</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
              Send your schematic, stack-up goals, or existing PCB files for a focused engineering review.
            </p>
            <motion.a href="/#contact" className="btn-primary"
              whileHover={{ scale: 1.03, boxShadow: '0 0 28px rgba(35,110,218,0.5)' }}
              whileTap={{ scale: 0.97 }}>
              Start a Project Review
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
