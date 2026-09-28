import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Eye, Pencil, Siren } from 'lucide-react';
import * as patientService from '../services/patientService';
import * as accessLogService from '../services/accessLogService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Breadcrumbs from '../components/Breadcrumbs';
import StatusBadge from '../components/StatusBadge';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import Modal from '../components/Modal';

export default function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [patient, setPatient] = useState(null);
  const [status, setStatus] = useState('loading');
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  useEffect(() => {
    setStatus('loading');
    patientService.getPatientById(id)
      .then((p) => {
        setPatient(p);
        setStatus(p ? 'ready' : 'error');
        if (p) {
          accessLogService.recordAccess({
            user: user.name,
            userId: user.id,
            role: user.role === 'doctor' ? 'Doctor' : 'Nurse',
            department: user.department,
            patient: p.name,
            patientId: p.id,
            action: 'Viewed Record',
            result: 'Success',
            risk: 'Normal',
          });
        }
      })
      .catch(() => setStatus('error'));
  }, [id, user]);

  if (status === 'loading') return <LoadingState label="Loading patient record..." />;
  if (status === 'error' || !patient) return <ErrorState message="Patient record not found." onRetry={() => navigate('/patients')} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Patient Records', to: '/patients' }, { label: patient.name }]} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-ink-900">{patient.name}</h1>
          <p className="text-sm text-ink-500 mt-1">{patient.id} &middot; {patient.department}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn-secondary" onClick={() => navigate('/patients')}>
            <ArrowLeft size={15} /> Back to Patients
          </button>
          <button className="btn-secondary" onClick={() => showToast('Opening patient record in read view.', 'info')}>
            <Eye size={15} /> View Record
          </button>
          <button className="btn-secondary" onClick={() => showToast('Record update saved (demo only).', 'success')}>
            <Pencil size={15} /> Update Record
          </button>
          <button className="btn-primary" onClick={() => setEmergencyOpen(true)}>
            <Siren size={15} /> Request Emergency Access
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-warning-200 bg-warning-50 px-4 py-3 flex items-start gap-2.5">
        <ShieldAlert size={17} className="text-warning-600 mt-0.5 shrink-0" />
        <p className="text-sm text-warning-700">
          This is sensitive patient information. Access is monitored and logged. Your view of this record has been recorded in the audit trail.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-ink-900 mb-4">Patient Information</h2>
          <dl className="space-y-3 text-sm">
            <Row label="Patient ID" value={patient.id} />
            <Row label="Name" value={patient.name} />
            <Row label="Age" value={patient.age} />
            <Row label="Gender" value={patient.gender} />
            <Row label="Department" value={patient.department} />
            <Row label="Assigned Doctor" value={patient.assignedDoctor} />
            <Row label="Status" value={<StatusBadge status={patient.status} />} />
          </dl>
        </div>

        <div className="card p-5">
          <h2 className="text-sm font-semibold text-ink-900 mb-4">Medical Information</h2>
          <dl className="space-y-3 text-sm">
            <Row label="Diagnosis" value={patient.diagnosis} />
            <Row label="Current Treatment" value={patient.currentTreatment} />
            <Row label="Last Visit" value={patient.lastVisit} />
          </dl>
          <div className="mt-4">
            <p className="text-xs font-medium text-ink-500 mb-2">Medical History</p>
            <ul className="space-y-1.5 list-disc list-inside text-sm text-ink-600">
              {patient.medicalHistory.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <Modal
        open={emergencyOpen}
        onClose={() => setEmergencyOpen(false)}
        title="Request Emergency Access"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setEmergencyOpen(false)}>Cancel</button>
            <button
              className="btn-primary"
              onClick={() => {
                setEmergencyOpen(false);
                showToast('Emergency access granted. This activity has been logged for security review.', 'warning');
              }}
            >
              Request Emergency Access
            </button>
          </>
        }
      >
        <p className="text-sm text-ink-600">
          Emergency access allows authorized clinicians to temporarily access records outside their normal
          department during a legitimate medical emergency for <strong>{patient.name}</strong>. For the full
          form, visit the Emergency Access page from your sidebar.
        </p>
      </Modal>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-ink-400">{label}</dt>
      <dd className="text-ink-800 font-medium text-right">{value}</dd>
    </div>
  );
}
