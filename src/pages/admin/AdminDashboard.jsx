import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, HeartPulse, FileClock, Siren, ArrowRight } from 'lucide-react';
import * as userService from '../../services/userService';
import * as patientService from '../../services/patientService';
import * as accessLogService from '../../services/accessLogService';
import * as alertService from '../../services/alertService';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/StatCard';
import LoadingState from '../../components/LoadingState';
import SeverityBadge from '../../components/SeverityBadge';
import StatusBadge from '../../components/StatusBadge';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([userService.getUsers(), patientService.getPatients(), accessLogService.getAccessLogs(), alertService.getAlerts()])
      .then(([users, patients, logs, alerts]) => setData({ users, patients, logs, alerts }));
  }, []);

  if (!data) return <LoadingState label="Loading administration overview..." />;

  const activeUsers = data.users.filter((u) => u.status === 'Active').length;
  const openAlerts = data.alerts.filter((a) => a.status === 'Open' || a.status === 'Investigating').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-ink-900">Administration Overview</h1>
        <p className="text-sm text-ink-500 mt-1">Welcome, {user.name}. Here's what's happening across MedGuard.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Users" value={activeUsers} icon={Users} tone="brand" hint={`${data.users.length} total accounts`} />
        <StatCard label="Patient Records" value={data.patients.length} icon={HeartPulse} tone="neutral" />
        <StatCard label="Access Log Entries" value={data.logs.length} icon={FileClock} tone="neutral" />
        <StatCard label="Open Security Alerts" value={openAlerts} icon={Siren} tone="danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-ink-900">Recent Security Alerts</h2>
            <Link to="/security/alerts" className="text-xs font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <ul className="space-y-3">
            {data.alerts.slice(0, 5).map((a) => (
              <li key={a.id} className="flex items-center justify-between text-sm">
                <div className="min-w-0">
                  <p className="font-medium text-ink-800 truncate">{a.type}</p>
                  <p className="text-xs text-ink-400">{a.user} &middot; {a.detectedAt}</p>
                </div>
                <SeverityBadge severity={a.severity} />
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-ink-900">User Directory Snapshot</h2>
            <Link to="/security/users" className="text-xs font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1">
              Manage users <ArrowRight size={12} />
            </Link>
          </div>
          <ul className="space-y-3">
            {data.users.slice(0, 5).map((u) => (
              <li key={u.id} className="flex items-center justify-between text-sm">
                <div className="min-w-0">
                  <p className="font-medium text-ink-800 truncate">{u.name}</p>
                  <p className="text-xs text-ink-400">{u.department}</p>
                </div>
                <StatusBadge status={u.status} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
