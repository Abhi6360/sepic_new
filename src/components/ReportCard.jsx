export default function ReportCard({ title, status, score }) {
  const statusClass = `status-${status.toLowerCase()}`;
  
  return (
    <div className="report-card">
      <span className="report-title">{title}</span>
      <div className="report-metrics">
        <span className={`report-status ${statusClass}`}>{status}</span>
        <span className="report-score">{score}</span>
      </div>
    </div>
  );
}
