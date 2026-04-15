import PageTemplate from './PageTemplate';

export default function DFX() {
  return (
    <PageTemplate 
      heroTitle="DFX checks that make the board easier to fabricate, assemble, inspect, and revise."
      heroImg="https://images.unsplash.com/photo-1649959265391-8a1de884248a?auto=format&fit=crop&w=1200&q=80"
    >
      <section className="section-padding">
        <div className="container">
          <div className="grid-2">
            <div style={{ padding: '2rem', background: 'var(--surface-card)', borderLeft: '2px solid var(--electric-blue)' }}>
              <h2 className="text-mono text-cyan" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>01 / Design For Fabrication</h2>
              <p className="text-muted">
                Validating copper geometries, annular rings, aspect ratios, solder mask clearances, and silkscreen legibility to ensure the bare board can be reliably manufactured by your chosen fab house.
              </p>
            </div>
            
            <div style={{ padding: '2rem', background: 'var(--surface-card)', borderLeft: '2px solid var(--electric-blue)' }}>
              <h2 className="text-mono text-cyan" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>02 / Design For Assembly</h2>
              <p className="text-muted">
                Checking component spacing, orientation, thermal reliefs, fiducial placement, and test point accessibility to streamline pick-and-place operations and reduce soldering defects.
              </p>
            </div>
          </div>
          
          <div style={{ marginTop: '3rem', padding: '3rem', background: 'var(--bg-dark)', border: '1px solid rgba(255,255,255,0.05)' }}>
             <h2 className="text-mono text-cyan" style={{ fontSize: '0.875rem', marginBottom: '1rem', textAlign: 'center' }}>03 / Release Package Review</h2>
             <p className="text-muted" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
               Before sending files to the CM, we perform a comprehensive audit of the entire release package, cross-referencing the BOM, Gerbers, and assembly drawings to catch discrepancies that cause costly production delays.
             </p>
          </div>
        </div>
      </section>
    </PageTemplate>
  );
}
