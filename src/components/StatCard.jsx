const TONES = {
  brand: 'bg-brand-50 text-brand-600',
  success: 'bg-success-50 text-success-600',
  warning: 'bg-warning-50 text-warning-600',
  danger: 'bg-danger-50 text-danger-600',
  neutral: 'bg-ink-100 text-ink-600',
};

export default function StatCard({ label, value, icon: Icon, tone = 'brand', hint }) {
  return (
    <div className="card p-5 flex items-start justify-between">
      <div>
        <p className="text-sm text-ink-500 font-medium">{label}</p>
        <p className="mt-2 text-2xl font-semibold text-ink-900">{value}</p>
        {hint && <p className="mt-1 text-xs text-ink-400">{hint}</p>}
      </div>
      {Icon && (
        <div className={`shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${TONES[tone]}`}>
          <Icon size={20} strokeWidth={2} />
        </div>
      )}
    </div>
  );
}
