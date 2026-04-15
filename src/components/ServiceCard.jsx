import { Link } from 'wouter';

export default function ServiceCard({ title, description, link }) {
  return (
    <div className="service-card">
      <div style={{ marginBottom: '1rem', color: 'var(--cyan)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
          <rect x="2" y="2" width="20" height="20" />
          <path d="M7 2v20M17 2v20M2 7h20M2 17h20" />
        </svg>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link href={link} className="card-link">Explore Service</Link>
    </div>
  );
}
