import { useEffect, useState } from 'react';
import { Users, FileCheck2, ShieldCheck, ShieldOff, Clock, FileText, Siren } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import * as patientService from '../../services/patientService';
import * as accessLogService from '../../services/accessLogService';
import StatCard from '../../components/StatCard';
import PatientTable from '../../components/PatientTable';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';

const ACTIVITY_ICONS = {
  'Accessed patient record': FileText,
  'Updated patient record': FileCheck2,
  'Access denied': ShieldOff,
  'Emergency access requested': Siren,
};

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let active = true;
    setStatus('loading');
    Promise.all([patientService.getPatients(), accessLogService.getAccessLogsForUser(user.name)])
      .then(([p, l]) => {
        if (!active) return;
        setPatients(p);
        setLogs(l);
        setStatus('ready');
      })
      .catch(() => active && setStatus('error'));
    return () => { active = false; };
  }, [user.name]);

  if (status === 'loading') return <LoadingState label="Loading your dashboard..." />;
  if (status === 'error') return <ErrorState onRetry={() => window.location.reload()} />;

  const myPatients = patients.filter((p) => p.assignedDoctor === user.name || p.department === user.department);
  const recentPatients = (myPatients.length ? myPatients : patients).slice(0, 6);
  const deniedToday = logs.filter((l) => l.result === 'Denied').length;
  const successToday = logs.filter((l) => l.result === 'Success').length;

  const activityFeed = [
    { label: 'Accessed patient record', detail: `${recentPatients[0]?.name || 'Patient'} — Cardiology follow-up`, time: '9 min ago' },
    { label: 'Updated patient record', detail: `${recentPatients[1]?.name || 'Patient'} — treatment plan revised`, time: '52 min ago' },
    { label: 'Access denied', detail: 'Attempted access outside assigned department', time: '2 hr ago' },
    { label: 'Emergency access requested', detail: 'Granted for 30 minutes — cardiac emergency', time: 'Yesterday' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-ink-900">{greeting()}, {user.name}</h1>
        <p className="text-sm text-ink-500 mt-1">Here is your patient access overview for today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Assigned Patients" value={myPatients.length || patients.length} icon={Users} tone="brand" />
        <StatCard label="Records Accessed Today" value={logs.length} icon={FileText} tone="neutral" />
        <StatCard label="Successful Accesses" value={successToday} icon={ShieldCheck} tone="success" />
        <StatCard label="Denied Access Attempts" value={deniedToday} icon={ShieldOff} tone="danger" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-ink-900">Recent Patients</h2>
          </div>
          <PatientTable patients={recentPatients} showAssignedDoctor={false} />
        </div>

        <div className="card p-5">
          <h2 className="text-sm font-semibold text-ink-900 mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            {activityFeed.map((item, idx) => {
              const Icon = ACTIVITY_ICONS[item.label] || Clock;
              return (
                <li key={idx} className="flex gap-3">
                  <div className="shrink-0 h-8 w-8 rounded-full bg-ink-100 text-ink-500 flex items-center justify-center">
                    <Icon size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink-800">{item.label}</p>
                    <p className="text-xs text-ink-500 truncate">{item.detail}</p>
                    <p className="text-[11px] text-ink-400 mt-0.5">{item.time}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
