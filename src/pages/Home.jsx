import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PCBCanvas from '../components/PCBCanvas';
import ServiceCard from '../components/ServiceCard';
import ReportCard from '../components/ReportCard';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      gsap.from('.hero-element', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2
      });
      
      gsap.utils.toArray('.fade-up').forEach(element => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      });
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef}>
      {/* Hero Section */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px', overflow: 'hidden' }}>
        <PCBCanvas />
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '800px' }}>
            <div className="hero-element text-mono text-cyan" style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>
              // SYSTEM_ONLINE : V1.0
            </div>
            <h1 className="hero-element" style={{ fontSize: '4rem', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              Precision PCB Design &amp; Signal Integrity Solutions
            </h1>
            <p className="hero-element" style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Build board-ready electronics with engineering checks inside the workflow.
            </p>
            <p className="hero-element" style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '650px' }}>
              SEPIC TECHNOLOGIES supports hardware teams with PCB library support, layout design, analysis-led review, and fabrication-ready release packages. We have handled 26-layer boards so far and can evaluate higher complexity as future projects demand.
            </p>
            <div className="hero-element" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#contact" className="btn-primary">Start a Project Review</a>
              <a href="#services" className="btn-secondary">View Services</a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding" style={{ background: 'var(--surface-primary)' }}>
        <div className="container">
          <div className="fade-up" style={{ marginBottom: '4rem' }}>
            <h2 className="text-mono text-cyan" style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>01 / Core Offerings</h2>
            <h3 style={{ fontSize: '2.5rem' }}>Engineering Services</h3>
          </div>
          
          <div className="grid-4 fade-up">
            <ServiceCard 
              title="Library Support" 
              description="PCB footprint creation with clean symbols, pads, and reusable component data." 
              link="/library-support" 
            />
            <ServiceCard 
              title="PCB Design" 
              description="Layout design for dense boards, clear constraints, and manufacturable releases." 
              link="/pcb-design" 
            />
            <ServiceCard 
              title="Analysis" 
              description="Board-level analysis that turns electrical and thermal risk into layout action." 
              link="/analysis" 
            />
            <ServiceCard 
              title="DFX" 
              description="Checks that make the board easier to fabricate, assemble, inspect, and revise." 
              link="/dfx" 
            />
          </div>
        </div>
      </section>

      {/* Analysis Workflow Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div className="fade-up">
              <h2 className="text-mono text-cyan" style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>02 / Diagnostics</h2>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Analysis-Led Layout</h3>
              <p className="text-muted" style={{ marginBottom: '2rem' }}>
                We don't just route traces; we validate them. Our workflow integrates continuous checks to ensure signal integrity, power stability, and thermal management before fabrication.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <ReportCard title="Critical net run" status="PASS" score="86%" />
                <ReportCard title="Power delivery sweep" status="REVIEW" score="58%" />
                <ReportCard title="Heat map" status="FIXED" score="78%" />
              </div>
            </div>
            
            <div className="fade-up" style={{ position: 'relative', height: '100%', minHeight: '400px', background: 'var(--surface-card)', border: '1px solid rgba(255,255,255,0.05)', padding: '2rem' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(rgba(103, 217, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(103, 217, 255, 0.05) 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.5 }} />
              <img src="https://images.unsplash.com/photo-1742811631376-6e6a72f29181?auto=format&fit=crop&w=900&q=80" alt="Analysis Workspace" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2) brightness(0.8)', border: '1px solid rgba(255,255,255,0.1)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="section-padding" style={{ background: 'var(--surface-primary)' }}>
        <div className="container">
          <div className="fade-up" style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <h2 className="text-mono text-cyan" style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>03 / Methodology</h2>
            <h3 style={{ fontSize: '2.5rem' }}>Engineering Process</h3>
          </div>
          
          <div className="grid-4 fade-up">
            {[
              { step: '01', title: 'Collect Constraints', desc: 'Define stack-up, impedance rules, and mechanical boundaries.' },
              { step: '02', title: 'Targeted Analysis', desc: 'Pre-layout simulation for critical interfaces and power networks.' },
              { step: '03', title: 'Resolve with Layout', desc: 'Iterative routing guided by SI/PI/Thermal feedback loops.' },
              { step: '04', title: 'Release Confidently', desc: 'Complete manufacturing package passing all DFX checks.' }
            ].map((s, i) => (
              <div key={i} style={{ padding: '2rem', background: 'var(--bg-dark)', borderTop: '2px solid var(--electric-blue)' }}>
                <span className="text-mono text-cyan" style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem', opacity: 0.5 }}>{s.step}</span>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{s.title}</h4>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="section-padding">
        <div className="container fade-up">
          <h2 className="text-mono text-cyan" style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>04 / Specs</h2>
          <h3 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Technical Capabilities</h3>
          
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <tbody>
                <tr>
                  <th style={{ width: '25%' }}>Board Complexity</th>
                  <td>2-26 layers rigid boards, high-density interconnects (HDI)</td>
                </tr>
                <tr>
                  <th>Integrity Domains</th>
                  <td>Signal Integrity (SI), Power Integrity (PI), Thermal Analysis</td>
                </tr>
                <tr>
                  <th>Interfaces</th>
                  <td>DDR, USB, Ethernet, LVDS, PCIe, SPI, I2C, UART</td>
                </tr>
                <tr>
                  <th>Deliverables</th>
                  <td>Gerbers, drill data, assembly files, BOM, source files, ODB++</td>
                </tr>
                <tr>
                  <th>Software Tools</th>
                  <td>Cadence Allegro, Altium Designer, PADS Professional, Siemens HyperLynx</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="section-padding" style={{ background: 'var(--surface-primary)' }}>
        <div className="container fade-up">
          <div className="grid-2">
            <div>
              <h2 className="text-mono text-cyan" style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>05 / Domains</h2>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Target Applications</h3>
              <p className="text-muted" style={{ marginBottom: '2rem' }}>Our engineering standards meet the stringent requirements of high-reliability sectors where failure is not an option.</p>
              
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--surface-card)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="text-cyan">■</span> Industrial electronics &amp; Automation
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--surface-card)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="text-cyan">■</span> High-speed digital computing
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--surface-card)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="text-cyan">■</span> Power and thermal products
                </li>
              </ul>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <img src="https://images.unsplash.com/photo-1631376178637-392efc9e356b?auto=format&fit=crop&w=900&q=80" alt="PCB Application" style={{ borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding" style={{ borderTop: '1px solid rgba(35, 110, 218, 0.3)' }}>
        <div className="container fade-up">
          <div className="grid-2">
            <div>
              <h2 className="text-mono text-cyan" style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>06 / Initialize</h2>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Start a Project Review</h3>
              <p className="text-muted" style={{ marginBottom: '3rem' }}>
                Send your schematic, stack-up goals, or existing PCB files for a focused engineering review.
              </p>
              
              <div style={{ marginBottom: '3rem' }}>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>HQ_COORDINATES</h4>
                <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Email: <a href="mailto:sales@sepic.in" className="text-cyan">sales@sepic.in</a></p>
                <p className="text-muted" style={{ fontSize: '0.9rem', maxWidth: '300px' }}>
                  OJ Plex, No 1218, 2nd floor, 80 Feet Rd, 2nd Phase, BDA Lay Out, Chandra Layout, Bengaluru, Karnataka 560040, India
                </p>
              </div>
              
              <div style={{ width: '100%', height: '250px', background: 'var(--surface-card)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <iframe 
                  src="https://www.google.com/maps?q=OJ%20Plex%20No%201218%202nd%20floor%2080%20Feet%20Rd%202nd%20Phase%20BDA%20Lay%20Out%20Chandra%20Layout%20Bengaluru%20Karnataka%20560040%20India&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(80%)' }} 
                  allowFullScreen="" 
                  loading="lazy"
                ></iframe>
              </div>
            </div>
            
            <div style={{ background: 'var(--surface-card)', padding: '3rem', border: '1px solid rgba(255,255,255,0.05)' }}>
              <form action="https://formsubmit.co/sales@sepic.in" method="POST">
                <input type="hidden" name="_subject" value="New SEPIC website project request" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="text" name="_honey" style={{ display: 'none' }} />
                
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input type="text" name="name" className="form-control" required />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-control" required />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Service Required</label>
                  <select name="service" className="form-control" required style={{ appearance: 'none' }} defaultValue="">
                    <option value="" disabled>Select a service...</option>
                    <option value="Library Support">Library Support</option>
                    <option value="PCB Design">PCB Design</option>
                    <option value="Analysis">Analysis</option>
                    <option value="DFX">DFX</option>
                    <option value="Complete PCB design package">Complete PCB design package</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Project Brief</label>
                  <textarea name="brief" className="form-control" placeholder="Describe layer count, key components, constraints..." required></textarea>
                </div>
                
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>Transmit Data</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
