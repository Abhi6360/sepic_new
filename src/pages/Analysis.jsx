import PageTemplate from './PageTemplate';

export default function Analysis() {
  return (
    <PageTemplate 
      heroTitle="Board-level analysis that turns electrical and thermal risk into layout action."
      heroImg="https://images.unsplash.com/photo-1742811631376-6e6a72f29181?auto=format&fit=crop&w=1200&q=80"
    >
      <section className="section-padding">
        <div className="container">
          <div className="grid-2">
            <div>
              <h2 className="text-mono text-cyan" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>01 / Signal Behavior</h2>
              <p className="text-muted" style={{ marginBottom: '2rem' }}>
                We verify controlled impedance, analyze differential routing, trace return paths, check timing constraints, and simulate crosstalk scenarios to guarantee signal integrity across high-speed interfaces.
              </p>
            </div>
            
            <div>
              <h2 className="text-mono text-cyan" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>02 / Power Behavior</h2>
              <p className="text-muted" style={{ marginBottom: '2rem' }}>
                Our PDN checks evaluate decoupling strategies, plane continuity, DC drop analysis, and regulator placement to ensure clean and stable power delivery to all critical components.
              </p>
            </div>

            <div>
              <h2 className="text-mono text-cyan" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>03 / Thermal Behavior</h2>
              <p className="text-muted" style={{ marginBottom: '2rem' }}>
                Through hotspot reviews, copper spreading analysis, via strategy evaluation, device placement optimization, and airflow considerations, we keep junction temperatures well within operating limits.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section-padding" style={{ background: 'var(--surface-primary)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Actionable Reports</h2>
            <p className="text-muted">
              Our findings are written for engineers who need to change the board. We don't just provide generic heatmaps; we provide specific layout modification recommendations, net-by-net constraints, and geometric corrections to resolve identified risks.
            </p>
          </div>
        </div>
      </section>
    </PageTemplate>
  );
}
