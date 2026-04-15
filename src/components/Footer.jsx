import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/">
              <img src="/assets/sepic_logo.svg" alt="SEPIC Technologies" className="logo-img" style={{ marginBottom: '1.5rem', height: '24px' }} />
            </Link>
            <p className="text-muted" style={{ maxWidth: '300px' }}>
              Library support, PCB design, analysis, and design for assembly and fabrication.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', marginBottom: '1.5rem', textTransform: 'uppercase', color: 'var(--text-primary)' }}>Services</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link href="/library-support" className="text-muted" style={{ transition: 'color 0.2s', ':hover': { color: 'var(--cyan)' } }}>Library Support</Link></li>
              <li><Link href="/pcb-design" className="text-muted">PCB Design</Link></li>
              <li><Link href="/analysis" className="text-muted">Analysis</Link></li>
              <li><Link href="/dfx" className="text-muted">DFX</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', marginBottom: '1.5rem', textTransform: 'uppercase', color: 'var(--text-primary)' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="/#process" className="text-muted">Process</a></li>
              <li><a href="/#capabilities" className="text-muted">Capabilities</a></li>
              <li><a href="/#contact" className="text-muted">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 SEPIC TECHNOLOGIES PRIVATE LIMITED</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="mailto:sales@sepic.in" style={{ color: 'var(--cyan)' }}>sales@sepic.in</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
