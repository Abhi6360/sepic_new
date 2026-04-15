import PageTemplate from './PageTemplate';

export default function PCBDesign() {
  return (
    <PageTemplate 
      heroTitle="PCB layout design for dense boards, clear constraints, and manufacturable releases."
      heroImg="https://images.unsplash.com/photo-1631376178637-392efc9e356b?auto=format&fit=crop&w=1200&q=80"
    >
      <section className="section-padding">
        <div className="container">
          <div className="grid-4" style={{ marginBottom: '4rem' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <h2 className="text-mono text-cyan" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>01 / 2-26 Layer Boards</h2>
              <p className="text-muted" style={{ marginBottom: '2rem' }}>
                From simple 2-layer control boards to complex 26-layer high-density interconnect (HDI) systems, we architect stack-ups that balance electrical requirements with fabrication yields and cost constraints.
              </p>
            </div>
            
            <div style={{ gridColumn: 'span 2' }}>
              <h2 className="text-mono text-cyan" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>02 / Placement and Routing</h2>
              <p className="text-muted" style={{ marginBottom: '2rem' }}>
                Strategic component placement driven by signal flow and thermal profiles, followed by meticulous routing. We handle length matching, differential pairs, and high-current paths with precision.
              </p>
            </div>
          </div>
          
          <div style={{ background: 'var(--surface-card)', padding: '3rem', border: '1px solid rgba(255,255,255,0.05)' }}>
             <h2 className="text-mono text-cyan" style={{ fontSize: '0.875rem', marginBottom: '2rem' }}>03 / Release Outputs</h2>
             <div className="grid-4">
               {[
                 'Gerbers', 'Drill files', 'Stack-up notes', 'Assembly drawings', 
                 'Pick-and-place data', 'Source files', 'BOM support'
               ].map((item, i) => (
                 <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)' }}>
                   <span className="text-cyan">›</span> {item}
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>
    </PageTemplate>
  );
}
