import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

const VARIANTS = {
  success: { icon: CheckCircle2, classes: 'bg-white border-success-200 text-success-700' },
  warning: { icon: AlertTriangle, classes: 'bg-white border-warning-200 text-warning-700' },
  danger: { icon: XCircle, classes: 'bg-white border-danger-200 text-danger-700' },
  info: { icon: Info, classes: 'bg-white border-brand-200 text-brand-700' },
};

export default function Notification({ message, variant = 'success', onClose }) {
  const { icon: Icon, classes } = VARIANTS[variant] || VARIANTS.info;
  return (
    <div className={`flex items-start gap-3 border rounded-lg shadow-card px-4 py-3 ${classes}`} role="status">
      <Icon size={18} className="mt-0.5 shrink-0" />
      <p className="text-sm text-ink-700 flex-1">{message}</p>
      <button onClick={onClose} className="text-ink-400 hover:text-ink-600" aria-label="Dismiss notification">
        <X size={16} />
      </button>
    </div>
  );
}
