import { useEffect, useState } from 'react';
import { Siren, CheckCircle2, ShieldCheck } from 'lucide-react';
import * as patientService from '../services/patientService';
import { useToast } from '../context/ToastContext';

const EMERGENCY_TYPES = ['Cardiac Emergency', 'Trauma / Accident', 'Mass Casualty Response', 'Sudden Deterioration', 'Other Critical Event'];
const DURATIONS = ['15 minutes', '30 minutes', '1 hour', '2 hours'];

export default function EmergencyAccess() {
  const { showToast } = useToast();
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ patientId: '', reason: '', type: EMERGENCY_TYPES[0], duration: DURATIONS[1] });
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    patientService.getPatients().then(setPatients);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.patientId || !form.reason) {
      showToast('Select a patient and provide a reason before submitting.', 'danger');
      return;
    }
    setGranted(true);
    showToast('Emergency access granted. This activity has been logged for security review.', 'warning');
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-xl font-semibold text-ink-900">Emergency Access</h1>
        <p className="text-sm text-ink-500 mt-1">
          Emergency access allows authorized clinicians to temporarily access records outside their normal
          department during a legitimate medical emergency.
        </p>
      </div>

      {granted && (
        <div className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 flex items-start gap-2.5">
          <CheckCircle2 size={18} className="text-brand-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-brand-800">Emergency access granted</p>
            <p className="text-sm text-brand-700 mt-0.5">
              This activity has been logged for security review. High-volume access during this window will be
              recognized as <strong>Emergency Access — Authorized</strong> instead of a suspicious mass-access event.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        <div>
          <label className="label">Patient</label>
          <select
            className="input"
            value={form.patientId}
            onChange={(e) => setForm({ ...form, patientId: e.target.value })}
          >
            <option value="">Select a patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>{p.name} — {p.id} ({p.department})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Reason</label>
          <textarea
            className="input min-h-[90px]"
            placeholder="Describe the medical emergency requiring immediate access..."
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="label">Emergency Type</label>
            <select className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              {EMERGENCY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Duration</label>
            <select className="input" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}>
              {DURATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <button type="submit" className="btn-primary w-full sm:w-auto">
          <Siren size={16} /> Request Emergency Access
        </button>
      </form>

      <div className="card p-5 bg-ink-50/60 border-dashed">
        <div className="flex items-start gap-2.5">
          <ShieldCheck size={17} className="text-ink-400 mt-0.5 shrink-0" />
          <p className="text-xs text-ink-500">
            Demo scenario: an authorized doctor can access many patient records during an active emergency window.
            MedGuard's detection rules recognize this pattern (Rule 4 — Emergency Exception) and log the activity
            without generating a mass-access alert, reducing false positives for Security Operations.
          </p>
        </div>
      </div>
    </div>
  );
}
