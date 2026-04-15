import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    if (location !== '/') {
      return; // Will just navigate to home via standard link if not on home
    }
    
    if (targetId) {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link href="/">
          <img src="/assets/sepic_logo.svg" alt="SEPIC Technologies" className="logo-img" />
        </Link>

        <div className="nav-links">
          <div className="dropdown">
            <span className="nav-link" style={{cursor: 'pointer'}}>Services</span>
            <div className="dropdown-menu">
              <Link href="/library-support" className="dropdown-item">Library Support</Link>
              <Link href="/pcb-design" className="dropdown-item">PCB Design</Link>
              <Link href="/analysis" className="dropdown-item">Analysis</Link>
              <Link href="/dfx" className="dropdown-item">DFX</Link>
            </div>
          </div>
          <a href="/#process" onClick={(e) => handleNavClick(e, 'process')} className="nav-link">Process</a>
          <a href="/#capabilities" onClick={(e) => handleNavClick(e, 'capabilities')} className="nav-link">Capabilities</a>
          <a href="/#contact" onClick={(e) => handleNavClick(e, 'contact')} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>Get Quote</a>
        </div>

        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          ☰
        </button>
      </div>
      
      {/* Basic mobile menu inline for simplicity */}
      {mobileMenuOpen && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--surface-card)', padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link href="/library-support" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>Library Support</Link>
            <Link href="/pcb-design" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>PCB Design</Link>
            <Link href="/analysis" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>Analysis</Link>
            <Link href="/dfx" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>DFX</Link>
            <a href="/#process" onClick={(e) => handleNavClick(e, 'process')} style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>Process</a>
            <a href="/#contact" onClick={(e) => handleNavClick(e, 'contact')} style={{ color: 'var(--cyan)', fontFamily: 'var(--font-mono)' }}>Get Quote</a>
          </div>
        </div>
      )}
    </nav>
  );
}
