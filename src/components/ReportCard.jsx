import { motion } from 'framer-motion';

const STATUS_MAP = {
  PASS: { cls: 'status-pass', dot: '#00ff88' },
  REVIEW: { cls: 'status-review', dot: '#ffb800' },
  FIXED: { cls: 'status-fixed', dot: '#67d9ff' },
};

export default function ReportCard({ title, status, score }) {
  const config = STATUS_MAP[status] || STATUS_MAP.PASS;
  const numericScore = parseInt(score, 10);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      whileHover={{ borderColor: 'rgba(35,110,218,0.3)', background: 'rgba(15,21,32,0.95)' }}
      transition={{ duration: 0.05 }}
      style={{
        background: 'rgba(15,21,32,0.8)',
        border: '1px solid rgba(255,255,255,0.06)',
        padding: '1rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
        transition: 'border-color 0.3s, background 0.3s',
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: '6px', height: '6px', borderRadius: '50%', background: config.dot, flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-primary)' }}>{title}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className={`report-status ${config.cls}`}>{status}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600, minWidth: '2.5rem', textAlign: 'right' }}>{score}</span>
        </div>
      </div>
      {/* progress bar */}
      <div style={{ height: '2px', background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${numericScore}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: '100%', background: `linear-gradient(to right, ${config.dot}88, ${config.dot})` }} />
      </div>
    </motion.div>
  );
}
