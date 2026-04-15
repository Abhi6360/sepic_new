import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import PCBCanvas from '../components/PCBCanvas';
import ServiceCard from '../components/ServiceCard';
import ReportCard from '../components/ReportCard';

function AnimatedCounter({ target, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(val) { setCount(Math.floor(val)); }
    });
    return () => controls.stop();
  }, [isInView, target]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const staggerChildren = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

function ScrollReveal({ children, delay = 0, className = '', style = {} }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 80]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const heroTextVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.18, duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <div>
      {/* ── HERO ── */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px', overflow: 'hidden' }}>
        <PCBCanvas mouseX={mousePos.x} mouseY={mousePos.y} />

        {/* Radial glow */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(35,110,218,0.10) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />

        <motion.div className="container" style={{ position: 'relative', zIndex: 10, opacity: heroOpacity, y: heroY }}>
          <motion.div style={{ maxWidth: '860px' }} initial="hidden" animate="visible" variants={staggerChildren}>
            <motion.div custom={0} variants={heroTextVariants}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--cyan)', marginBottom: '1.5rem', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ display: 'inline-block', width: '32px', height: '1px', background: 'var(--cyan)' }} />
              Sepic Technologies — PCB Engineering
              <span style={{ display: 'inline-block', width: '32px', height: '1px', background: 'var(--cyan)' }} />
            </motion.div>

            <motion.h1 custom={1} variants={heroTextVariants}
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5.2rem)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '1.75rem', fontWeight: 700 }}>
              Precision PCB Design
              <br />
              <span style={{ background: 'linear-gradient(90deg, var(--bright-blue), var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                &amp; Signal Integrity
              </span>
              <span style={{ color: 'var(--text-primary)' }}> Solutions</span>
            </motion.h1>

            <motion.p custom={2} variants={heroTextVariants}
              style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '0.75rem', maxWidth: '680px', lineHeight: 1.7 }}>
              Build board-ready electronics with engineering checks inside the workflow.
            </motion.p>

            <motion.p custom={3} variants={heroTextVariants}
              style={{ fontSize: '0.95rem', color: 'rgba(138,154,188,0.75)', marginBottom: '2.75rem', maxWidth: '620px', lineHeight: 1.8 }}>
              From PCB library support to 26-layer layout design, signal analysis, and fabrication-ready release packages — SEPIC handles every critical layer.
            </motion.p>

            <motion.div custom={4} variants={heroTextVariants} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <motion.a href="#contact" className="btn-primary"
                whileHover={{ scale: 1.03, boxShadow: '0 0 28px rgba(35,110,218,0.5)' }}
                whileTap={{ scale: 0.97 }}
                style={{ fontSize: '0.9rem' }}>
                Get Quote
              </motion.a>
              <motion.a href="#services" className="btn-secondary"
                whileHover={{ borderColor: 'var(--cyan)', color: 'var(--cyan)' }}
                whileTap={{ scale: 0.97 }}
                style={{ fontSize: '0.9rem' }}>
                View Services
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }}
          style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--cyan), transparent)' }} />
        </motion.div>
      </section>

      {/* ── STATS / WHY US ── */}
      <section style={{ padding: '6rem 0', background: 'var(--surface-primary)', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container">
          <ScrollReveal style={{ marginBottom: '4rem', maxWidth: '640px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>01 / Why Choose Us</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', lineHeight: 1.2, fontWeight: 700 }}>Engineering-grade precision at every layer.</h2>
          </ScrollReveal>

          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2px', marginBottom: '5rem' }}
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={staggerChildren}>
            {[
              { label: 'Layers Handled', value: 26, suffix: '+' },
              { label: 'Engineering Services', value: 4, suffix: '' },
              { label: 'Interfaces Supported', value: 8, suffix: '+' },
              { label: 'Years Experience', value: 10, suffix: '+' },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUp}
                style={{ padding: '2.5rem 2rem', background: 'var(--surface-card)', borderLeft: i === 0 ? '1px solid rgba(35,110,218,0.4)' : '1px solid rgba(255,255,255,0.04)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: 'linear-gradient(to bottom, var(--electric-blue), transparent)' }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.75rem' }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust points */}
          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={staggerChildren}>
            {[
              { icon: '◈', title: 'Analysis-Led Design', desc: 'Every routing decision is validated against SI, PI and thermal models before tape-out.' },
              { icon: '◉', title: 'End-to-End Ownership', desc: 'Library creation through fabrication release — one team, zero handoff gaps.' },
              { icon: '◫', title: 'Tool Agnostic', desc: 'Cadence Allegro, Altium Designer, PADS Pro, HyperLynx — we work in your ecosystem.' },
            ].map((pt, i) => (
              <motion.div key={i} variants={fadeUp}
                whileHover={{ y: -4, borderColor: 'rgba(35,110,218,0.35)' }}
                style={{ padding: '2rem', background: 'var(--bg-dark)', border: '1px solid rgba(255,255,255,0.06)', transition: 'border-color 0.3s' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', color: 'var(--cyan)', display: 'block', marginBottom: '1rem' }}>{pt.icon}</span>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', fontWeight: 600 }}>{pt.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{pt.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: '8rem 0' }}>
        <div className="container">
          <ScrollReveal style={{ marginBottom: '4rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>02 / Core Offerings</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700 }}>Specialized PCB Engineering Services</h2>
          </ScrollReveal>

          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5px', background: 'rgba(255,255,255,0.04)' }}
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={staggerChildren}>
            {[
              { num: '01', title: 'Library Support', desc: 'Footprint creation, schematic symbols, pin mapping, land pattern checks, 3D model alignment and reusable component data.', link: '/library-support', img: 'https://images.unsplash.com/photo-1767448068187-5be3cbc848c7?auto=format&fit=crop&w=900&q=80' },
              { num: '02', title: 'PCB Design', desc: 'Layout design, placement strategy, stack-up coordination, controlled routing, power planning and manufacturing-ready outputs.', link: '/pcb-design', img: 'https://images.unsplash.com/photo-1631376178637-392efc9e356b?auto=format&fit=crop&w=900&q=80' },
              { num: '03', title: 'Analysis', desc: 'Integrated signal, power and thermal analysis delivered as one workflow with clear findings and layout-level fixes.', link: '/analysis', img: 'https://images.unsplash.com/photo-1742811631376-6e6a72f29181?auto=format&fit=crop&w=900&q=80' },
              { num: '04', title: 'DFX', desc: 'Fabrication checks, assembly review, panel notes, BOM sanity checks, pick-and-place readiness and release documentation.', link: '/dfx', img: 'https://images.unsplash.com/photo-1649959265391-8a1de884248a?auto=format&fit=crop&w=900&q=80' },
            ].map((svc, i) => (
              <ServiceCard key={i} {...svc} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ANALYSIS DIAGNOSTICS ── */}
      <section style={{ padding: '8rem 0', background: 'var(--surface-primary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem', alignItems: 'center' }}>
            <ScrollReveal>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>03 / Diagnostics</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, marginBottom: '1.5rem' }}>Analysis-Led Layout</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.8, fontSize: '0.95rem' }}>
                We don't just route traces — we validate them. Our workflow integrates continuous checks to ensure signal integrity, power stability and thermal safety before fabrication.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <ReportCard title="Critical net run" status="PASS" score="86%" />
                <ReportCard title="Power delivery sweep" status="REVIEW" score="58%" />
                <ReportCard title="Heat map analysis" status="FIXED" score="78%" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15} style={{ position: 'relative' }}>
              <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(103,217,255,0.15)', background: 'var(--surface-card)' }}>
                <img src="https://images.unsplash.com/photo-1742811631376-6e6a72f29181?auto=format&fit=crop&w=900&q=80"
                  alt="Analysis workspace"
                  style={{ width: '100%', display: 'block', filter: 'grayscale(60%) contrast(1.1) brightness(0.75)' }} />
                {/* scan line overlay */}
                <motion.div
                  animate={{ y: ['0%', '100%'] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right, transparent, rgba(103,217,255,0.6), transparent)', mixBlendMode: 'screen' }} />
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(103,217,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(103,217,255,0.03) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                {/* corner brackets */}
                {['topLeft','topRight','bottomLeft','bottomRight'].map(corner => (
                  <div key={corner} style={{
                    position: 'absolute',
                    width: '16px', height: '16px',
                    borderColor: 'var(--cyan)',
                    borderStyle: 'solid',
                    borderWidth: 0,
                    ...(corner === 'topLeft' ? { top: 10, left: 10, borderTopWidth: 2, borderLeftWidth: 2 } : {}),
                    ...(corner === 'topRight' ? { top: 10, right: 10, borderTopWidth: 2, borderRightWidth: 2 } : {}),
                    ...(corner === 'bottomLeft' ? { bottom: 10, left: 10, borderBottomWidth: 2, borderLeftWidth: 2 } : {}),
                    ...(corner === 'bottomRight' ? { bottom: 10, right: 10, borderBottomWidth: 2, borderRightWidth: 2 } : {}),
                  }} />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" style={{ padding: '8rem 0' }}>
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: '5rem', maxWidth: '560px', margin: '0 auto 5rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>04 / Methodology</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700 }}>Engineering Process</h2>
          </ScrollReveal>

          <motion.div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0', position: 'relative' }}
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={staggerChildren}>

            {[
              { step: '01', title: 'Collect Constraints', desc: 'Define stack-up, impedance targets, mechanical limits, thermal budgets and interface timing requirements.' },
              { step: '02', title: 'Targeted Analysis', desc: 'Pre-layout simulation for critical interfaces (DDR, PCIe, LVDS) and power delivery networks.' },
              { step: '03', title: 'Resolve with Layout', desc: 'Iterative routing guided by SI/PI/thermal feedback — every trace validated before sign-off.' },
              { step: '04', title: 'Release Confidently', desc: 'Complete manufacturing package with Gerbers, drill data, BOM and DFX sign-off.' },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} style={{ position: 'relative' }}>
                {/* connector trace between steps */}
                {i < 3 && (
                  <motion.div
                    initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.18, duration: 0.6, ease: 'easeOut' }}
                    style={{ position: 'absolute', top: '2.85rem', right: '-1px', height: '2px', width: '100%', transformOrigin: 'left',
                      background: 'linear-gradient(to right, var(--electric-blue), rgba(35,110,218,0.2))', zIndex: 1,
                      display: 'none' /* hidden on mobile, shown via class */ }} className="process-connector" />
                )}
                <motion.div
                  whileHover={{ background: 'var(--surface-card)', borderColor: 'rgba(35,110,218,0.4)' }}
                  style={{ padding: '2.5rem 2rem', background: 'var(--surface-primary)', border: '1px solid rgba(255,255,255,0.05)', height: '100%', cursor: 'default', transition: 'background 0.3s, border-color 0.3s', position: 'relative', zIndex: 2 }}>
                  <div style={{ width: '3rem', height: '3rem', border: '1px solid rgba(35,110,218,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.75rem', position: 'relative' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--cyan)', letterSpacing: '0.05em' }}>{s.step}</span>
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                      style={{ position: 'absolute', inset: -3, border: '1px solid rgba(35,110,218,0.2)' }} />
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>{s.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.75 }}>{s.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section style={{ padding: '8rem 0', background: 'var(--surface-primary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem', alignItems: 'center' }}>
            <ScrollReveal>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>05 / Toolchain</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, marginBottom: '1.5rem' }}>Industry-Standard Tools</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.8, fontSize: '0.95rem' }}>
                We operate inside your design ecosystem — not alongside it. Every tool in our stack is production-grade and in active daily use across complex multi-layer programs.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {[
                  { name: 'Cadence Allegro', domain: 'PCB Layout & Routing', fill: 92 },
                  { name: 'Altium Designer', domain: 'Schematic + Layout', fill: 88 },
                  { name: 'Siemens HyperLynx', domain: 'Signal & Power Integrity', fill: 85 },
                  { name: 'PADS Professional', domain: 'PCB Design', fill: 80 },
                ].map((tool, i) => (
                  <div key={i} style={{ padding: '1.25rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{tool.name}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>{tool.domain}</span>
                    </div>
                    <div style={{ height: '2px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }} whileInView={{ width: `${tool.fill}%` }}
                        viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        style={{ height: '100%', background: 'linear-gradient(to right, var(--electric-blue), var(--cyan))' }} />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5px', background: 'rgba(255,255,255,0.04)' }}>
                {[
                  { id: 'SI', label: 'Signal Integrity', desc: 'Impedance control, differential routing, timing margin analysis' },
                  { id: 'PI', label: 'Power Integrity', desc: 'PDN simulation, decoupling placement, voltage plane analysis' },
                  { id: 'TH', label: 'Thermal Analysis', desc: 'Hotspot mapping, via thermal relief, copper pour strategy' },
                  { id: 'DFX', label: 'DFX Review', desc: 'DFA, DFM, panelization, assembly drawing, BOM audit' },
                ].map((cap, i) => (
                  <motion.div key={i} whileHover={{ background: 'rgba(35,110,218,0.08)' }}
                    style={{ padding: '2rem', background: 'var(--bg-dark)', transition: 'background 0.3s', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--electric-blue)', lineHeight: 1 }}>{cap.id}</span>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>{cap.label}</h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{cap.desc}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES TABLE ── */}
      <section id="capabilities" style={{ padding: '8rem 0' }}>
        <div className="container">
          <ScrollReveal style={{ marginBottom: '4rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>06 / Specs</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700 }}>Technical Capabilities</h2>
          </ScrollReveal>

          <ScrollReveal>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <tbody>
                  {[
                    ['Board Complexity', '2–26 layer rigid boards, high-density interconnects (HDI), and complex stackups'],
                    ['Integrity Domains', 'Signal Integrity (SI), Power Integrity (PI), Thermal Analysis — delivered as one workflow'],
                    ['Interfaces', 'DDR, USB, Ethernet, LVDS, PCIe-style differential routing, SPI, I2C, UART, sensors'],
                    ['Deliverables', 'Analysis reports, Gerbers, drill data, assembly files, BOM support, source files, ODB++'],
                    ['Software Tools', 'Cadence Allegro, Altium Designer, PADS Professional, Siemens HyperLynx'],
                  ].map(([key, val], i) => (
                    <motion.tr key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                      <th>{key}</th>
                      <td>{val}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section style={{ padding: '0 0 8rem' }}>
        <div className="container">
          <ScrollReveal>
            <motion.div
              whileHover={{ boxShadow: '0 0 80px rgba(35,110,218,0.25), inset 0 0 60px rgba(35,110,218,0.05)' }}
              style={{
                position: 'relative', overflow: 'hidden',
                padding: 'clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 5rem)',
                background: 'linear-gradient(135deg, rgba(35,110,218,0.12) 0%, rgba(10,13,20,0.95) 50%, rgba(103,217,255,0.06) 100%)',
                border: '1px solid rgba(35,110,218,0.3)',
                display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2.5rem',
                transition: 'box-shadow 0.4s ease'
              }}>
              {/* glow orbs */}
              <div style={{ position: 'absolute', top: '-40%', left: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(35,110,218,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-40%', right: '-10%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(103,217,255,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
              {/* scan line */}
              <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
                style={{ position: 'absolute', top: 0, bottom: 0, width: '30%', background: 'linear-gradient(to right, transparent, rgba(103,217,255,0.04), transparent)', pointerEvents: 'none' }} />

              <div style={{ position: 'relative', maxWidth: '600px' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem' }}>Ready to start</p>
                <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1rem' }}>
                  Send your schematic, stack-up goals, or existing PCB files.
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Get a focused engineering review with clear findings and a defined next step.</p>
              </div>

              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
                <motion.a href="#contact" className="btn-primary"
                  whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(35,110,218,0.6)' }}
                  whileTap={{ scale: 0.96 }}
                  style={{ fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                  Start Your Project
                </motion.a>
                <a href="mailto:sales@sepic.in" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
                  or email sales@sepic.in
                </a>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: '8rem 0', background: 'var(--surface-primary)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container">
          <ScrollReveal style={{ marginBottom: '4rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>07 / Initialize</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700 }}>Start a Project Review</h2>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem' }}>
            <ScrollReveal>
              <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', lineHeight: 1.8 }}>
                Share the board type, layer count, interfaces, thermal limits, target timeline and analysis scope. We will turn that into a clear next step.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {[
                  { label: 'Email', value: 'sales@sepic.in', href: 'mailto:sales@sepic.in' },
                  { label: 'Boards', value: '26-layer boards handled so far' },
                  { label: 'Address', value: 'OJ Plex, No 1218, 2nd floor, 80 Feet Rd, 2nd Phase, BDA Layout, Chandra Layout, Bengaluru, Karnataka 560040' },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '1.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'grid', gridTemplateColumns: '110px 1fr', gap: '1.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', paddingTop: '2px' }}>{item.label}</span>
                    {item.href
                      ? <a href={item.href} style={{ color: 'var(--cyan)', fontSize: '0.95rem' }}>{item.value}</a>
                      : <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.value}</span>
                    }
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2.5rem', height: '240px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                <iframe
                  src="https://www.google.com/maps?q=OJ%20Plex%20No%201218%202nd%20floor%2080%20Feet%20Rd%202nd%20Phase%20BDA%20Lay%20Out%20Chandra%20Layout%20Bengaluru%20Karnataka%20560040%20India&output=embed"
                  width="100%" height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(80%)' }}
                  allowFullScreen="" loading="lazy" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <form action="https://formsubmit.co/sales@sepic.in" method="POST"
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'var(--surface-card)', padding: '3rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <input type="hidden" name="_subject" value="New SEPIC website project request" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="text" name="_honey" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

                {[
                  { label: 'Name', name: 'name', type: 'text' },
                  { label: 'Email', name: 'email', type: 'email' },
                ].map(field => (
                  <div key={field.name}>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>{field.label}</label>
                    <input type={field.type} name={field.name} required className="form-control" />
                  </div>
                ))}

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>Service Required</label>
                  <select name="service" required className="form-control" defaultValue="" style={{ appearance: 'none', cursor: 'pointer' }}>
                    <option value="" disabled>Select a service...</option>
                    <option value="Library Support">Library Support</option>
                    <option value="PCB Design">PCB Design</option>
                    <option value="Analysis">Analysis</option>
                    <option value="DFX">DFX</option>
                    <option value="Complete PCB design package">Complete PCB design package</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>Project Brief</label>
                  <textarea name="message" rows="5" required className="form-control"
                    placeholder="Layer count, interfaces, power rails, board size, stack-up, timeline..." />
                </div>

                <motion.button type="submit" className="btn-primary"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 24px rgba(35,110,218,0.45)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{ width: '100%', justifyContent: 'center' }}>
                  Send Project Details
                </motion.button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
