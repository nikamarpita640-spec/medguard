import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Ban, CheckCircle2, ArrowUpCircle, StickyNote } from 'lucide-react';
import * as alertService from '../../services/alertService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Breadcrumbs from '../../components/Breadcrumbs';
import SeverityBadge from '../../components/SeverityBadge';
import StatusBadge from '../../components/StatusBadge';
import Timeline from '../../components/Timeline';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import ConfirmationModal from '../../components/ConfirmationModal';

export default function AlertDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [alert, setAlert] = useState(null);
  const [status, setStatus] = useState('loading');
  const [note, setNote] = useState('');
  const [confirmResolve, setConfirmResolve] = useState(false);

  function load() {
    setStatus('loading');
    alertService.getAlertById(id)
      .then((a) => { setAlert(a); setStatus(a ? 'ready' : 'error'); })
      .catch(() => setStatus('error'));
  }

  useEffect(load, [id]);

  async function setActionStatus(newStatus, message) {
    await alertService.updateAlertStatus(id, newStatus);
    showToast(message, newStatus === 'False Positive' ? 'info' : 'success');
    load();
  }

  async function submitNote() {
    if (!note.trim()) return;
    await alertService.addInvestigationNote(id, user.name, note.trim());
    setNote('');
    showToast('Investigation note added.', 'success');
    load();
  }

  if (status === 'loading') return <LoadingState label="Loading alert details..." />;
  if (status === 'error' || !alert) return <ErrorState message="Alert not found." onRetry={() => navigate('/security/alerts')} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Alerts', to: '/security/alerts' }, { label: alert.id }]} />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <SeverityBadge severity={alert.severity} />
            <StatusBadge status={alert.status} />
          </div>
          <h1 className="text-xl font-semibold text-ink-900">{alert.type}</h1>
          <p className="text-sm text-ink-500 mt-1">{alert.id} &middot; Detected {alert.detectedAt}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-ink-900 mb-3">What happened?</h2>
            <p className="text-sm text-ink-600 leading-relaxed">{alert.summary}</p>
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-semibold text-ink-900 mb-3">Evidence</h2>
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <EvidenceItem label="Records Accessed" value={alert.evidence.recordsAccessed} />
              <EvidenceItem label="Time Window" value={alert.evidence.timeWindow} />
              <EvidenceItem label="Failed Login Count" value={alert.evidence.failedLogins} />
              <EvidenceItem label="IP Address" value={alert.ip} mono />
              <EvidenceItem
                label="Departments Accessed"
                value={alert.evidence.departmentsAccessed.length ? alert.evidence.departmentsAccessed.join(', ') : '—'}
              />
              <EvidenceItem label="Previous Activity" value={alert.evidence.previousActivity} />
            </dl>
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-semibold text-ink-900 mb-4">Activity Timeline</h2>
            <Timeline items={alert.timeline} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-ink-900 mb-3">User Information</h2>
            <dl className="space-y-2.5 text-sm">
              <Row label="User" value={alert.user} />
              <Row label="Department" value={alert.department} />
              <Row label="IP Address" value={alert.ip} mono />
              <Row label="Rule Triggered" value={alert.ruleId} />
            </dl>
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-semibold text-ink-900 mb-3">Investigation Actions</h2>
            <div className="flex flex-col gap-2">
              <button className="btn-secondary justify-start" onClick={() => setActionStatus('Investigating', 'Alert marked as investigating.')}>
                <Search size={15} /> Mark as Investigating
              </button>
              <button className="btn-secondary justify-start" onClick={() => setActionStatus('False Positive', 'Alert marked as a false positive.')}>
                <Ban size={15} /> Mark as False Positive
              </button>
              <button className="btn-secondary justify-start" onClick={() => setConfirmResolve(true)}>
                <CheckCircle2 size={15} /> Resolve Alert
              </button>
              <button className="btn-secondary justify-start" onClick={() => setActionStatus('Investigating', 'Alert escalated to senior security staff.')}>
                <ArrowUpCircle size={15} /> Escalate
              </button>
            </div>

            <div className="mt-5 pt-5 border-t border-ink-100">
              <label className="label flex items-center gap-1.5"><StickyNote size={14} /> Add Investigation Note</label>
              <textarea
                className="input min-h-[80px]"
                placeholder="Document your findings..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <button className="btn-primary w-full mt-2" onClick={submitNote}>Add Note</button>
            </div>
          </div>

          {alert.notes.length > 0 && (
            <div className="card p-5">
              <h2 className="text-sm font-semibold text-ink-900 mb-3">Notes</h2>
              <ul className="space-y-3">
                {alert.notes.map((n, idx) => (
                  <li key={idx} className="text-sm bg-ink-50 rounded-lg p-3">
                    <p className="text-ink-700">{n.text}</p>
                    <p className="text-xs text-ink-400 mt-1.5">{n.author} &middot; {n.time}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <ConfirmationModal
        open={confirmResolve}
        onClose={() => setConfirmResolve(false)}
        title="Resolve this alert?"
        message="This marks the investigation as complete. You can still reopen it later if new evidence emerges."
        confirmLabel="Resolve Alert"
        onConfirm={() => { setConfirmResolve(false); setActionStatus('Resolved', 'Alert resolved.'); }}
      />
    </div>
  );
}

function EvidenceItem({ label, value, mono }) {
  return (
    <div>
      <p className="text-xs text-ink-400">{label}</p>
      <p className={`text-ink-800 font-medium mt-0.5 ${mono ? 'font-mono text-xs' : ''}`}>{value}</p>
    </div>
  );
}

function Row({ label, value, mono }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-ink-400">{label}</dt>
      <dd className={`text-ink-800 font-medium text-right ${mono ? 'font-mono text-xs' : ''}`}>{value}</dd>
    </div>
  );
}
