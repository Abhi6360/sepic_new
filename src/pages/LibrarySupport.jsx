import PageTemplate from './PageTemplate';

export default function LibrarySupport() {
  return (
    <PageTemplate 
      heroTitle="PCB footprint creation with clean symbols, pads, and reusable component data."
      heroImg="https://images.unsplash.com/photo-1767448068187-5be3cbc848c7?auto=format&fit=crop&w=1200&q=80"
    >
      <section className="section-padding">
        <div className="container">
          <div className="grid-2">
            <div>
              <h2 className="text-mono text-cyan" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>01 / PCB Footprint Creation</h2>
              <p className="text-muted" style={{ marginBottom: '2rem' }}>
                IPC-compliant footprints built to exact manufacturer specifications. We verify pad geometries, solder mask expansions, paste mask data, and courtyards to prevent assembly issues before they start.
              </p>
              
              <h2 className="text-mono text-cyan" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>02 / Schematic Symbols</h2>
              <p className="text-muted" style={{ marginBottom: '2rem' }}>
                Logical, clean, and consistent schematic symbols that make circuits readable. Pin grouping by function, standardized property fields, and accurate vendor data linkage.
              </p>

              <h2 className="text-mono text-cyan" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>03 / 3D and Assembly Support</h2>
              <p className="text-muted">
                Accurate 3D STEP models mapped to footprints for mechanical clearance checking. Comprehensive property data for seamless BOM generation and ERP integration.
              </p>
            </div>
            
            <div style={{ background: 'var(--surface-card)', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ borderLeft: '1px solid var(--electric-blue)', paddingLeft: '1.5rem' }}>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Data Integrity First</h4>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                  A minor error in a library part propagates across every board that uses it. We treat library creation as a critical engineering task, not just data entry. Every part undergoes peer review before release to your central library.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTemplate>
  );
}
