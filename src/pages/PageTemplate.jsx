import { useEffect } from 'react';

export default function PageTemplate({ heroTitle, heroImg, children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '80px' }}>
      <section style={{ 
        position: 'relative', 
        padding: '8rem 0', 
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          opacity: 0.15,
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage: 'linear-gradient(to right, transparent, black)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black)'
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px' }}>
            <h1 style={{ 
              fontSize: '3.5rem', 
              lineHeight: 1.1, 
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em'
            }}>
              {heroTitle}
            </h1>
          </div>
        </div>
      </section>

      {children}
      
      <section className="section-padding" style={{ background: 'var(--surface-primary)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Ready to review your layout?</h2>
          <p className="text-muted" style={{ marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Send your schematic, stack-up goals, or existing PCB files for a focused engineering review.
          </p>
          <a href="mailto:sales@sepic.in" className="btn-primary">Email sales@sepic.in</a>
        </div>
      </section>
    </div>
  );
}
