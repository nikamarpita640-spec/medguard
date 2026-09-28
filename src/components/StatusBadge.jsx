const STYLES = {
  Success: 'bg-success-50 text-success-700 ring-1 ring-inset ring-success-100',
  Allowed: 'bg-success-50 text-success-700 ring-1 ring-inset ring-success-100',
  Active: 'bg-success-50 text-success-700 ring-1 ring-inset ring-success-100',
  Resolved: 'bg-success-50 text-success-700 ring-1 ring-inset ring-success-100',
  Denied: 'bg-danger-50 text-danger-700 ring-1 ring-inset ring-danger-100',
  Disabled: 'bg-ink-100 text-ink-500 ring-1 ring-inset ring-ink-200',
  Suspicious: 'bg-warning-50 text-warning-700 ring-1 ring-inset ring-warning-100',
  Emergency: 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100',
  Open: 'bg-warning-50 text-warning-700 ring-1 ring-inset ring-warning-100',
  Investigating: 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100',
  'False Positive': 'bg-ink-100 text-ink-500 ring-1 ring-inset ring-ink-200',
  'Under Observation': 'bg-warning-50 text-warning-700 ring-1 ring-inset ring-warning-100',
  Discharged: 'bg-ink-100 text-ink-500 ring-1 ring-inset ring-ink-200',
  Normal: 'bg-ink-100 text-ink-500 ring-1 ring-inset ring-ink-200',
};

export default function StatusBadge({ status }) {
  const style = STYLES[status] || 'bg-ink-100 text-ink-600 ring-1 ring-inset ring-ink-200';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style}`}>
      {status}
    </span>
  );
}
