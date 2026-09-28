const STYLES = {
  Critical: 'bg-danger-500 text-white',
  High: 'bg-danger-100 text-danger-700',
  Medium: 'bg-warning-100 text-warning-700',
  Low: 'bg-ink-100 text-ink-600',
};

export default function SeverityBadge({ severity }) {
  const style = STYLES[severity] || STYLES.Low;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${style}`}>
      {severity}
    </span>
  );
}
