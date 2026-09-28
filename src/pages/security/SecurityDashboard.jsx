import { useEffect, useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import { ShieldAlert, Siren, KeyRound, Activity, Search } from 'lucide-react';
import * as alertService from '../../services/alertService';
import * as accessLogService from '../../services/accessLogService';
import StatCard from '../../components/StatCard';
import ChartCard from '../../components/ChartCard';
import Timeline from '../../components/Timeline';
import SeverityBadge from '../../components/SeverityBadge';
import LoadingState from '../../components/LoadingState';

const SEVERITY_COLORS = { Critical: '#d8393f', High: '#e08a1e', Medium: '#eab308', Low: '#8691a0' };
const ACCESS_TREND = [
  { time: '00:00', attempts: 12 }, { time: '04:00', attempts: 8 }, { time: '08:00', attempts: 64 },
  { time: '12:00', attempts: 91 }, { time: '16:00', attempts: 77 }, { time: '20:00', attempts: 38 }, { time: '23:59', attempts: 19 },
];

export default function SecurityDashboard() {
  const [alerts, setAlerts] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loginAttempts, setLoginAttempts] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    Promise.all([alertService.getAlerts(), accessLogService.getAccessLogs(), accessLogService.getLoginAttempts()])
      .then(([a, l, la]) => { setAlerts(a); setLogs(l); setLoginAttempts(la); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }, []);

  const severityData = useMemo(() => {
    const counts = { Critical: 0, High: 0, Medium: 0, Low: 0 };
    alerts.forEach((a) => { counts[a.severity] = (counts[a.severity] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [alerts]);

  if (status === 'loading') return <LoadingState label="Loading security operations data..." />;

  const failedLogins = loginAttempts.filter((l) => l.result === 'Failed').length;
  const suspiciousCount = logs.filter((l) => l.risk === 'Suspicious').length;
  const activeAlerts = alerts.filter((a) => a.status === 'Open' || a.status === 'Investigating').length;
  const pendingInvestigations = alerts.filter((a) => a.status === 'Investigating').length;

  const suspiciousEvents = alerts.slice(0, 5).map((a) => ({ time: a.detectedAt, event: `${a.type} — ${a.user}` }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-ink-900">Security Operations Center</h1>
        <p className="text-sm text-ink-500 mt-1">Live overview of access attempts, alerts, and open investigations.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Total Access Attempts" value={logs.length + loginAttempts.length} icon={Activity} tone="brand" />
        <StatCard label="Suspicious Activities" value={suspiciousCount} icon={ShieldAlert} tone="warning" />
        <StatCard label="Failed Logins" value={failedLogins} icon={KeyRound} tone="danger" />
        <StatCard label="Active Alerts" value={activeAlerts} icon={Siren} tone="danger" />
        <StatCard label="Investigations Pending" value={pendingInvestigations} icon={Search} tone="neutral" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <ChartCard title="Access Activity" subtitle="Access attempts over the last 24 hours" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={ACCESS_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eceef0" />
              <XAxis dataKey="time" tick={{ fontSize: 12, fill: '#8691a0' }} axisLine={{ stroke: '#eceef0' }} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#8691a0' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #eceef0', fontSize: 13 }} />
              <Line type="monotone" dataKey="attempts" stroke="#1c7e7e" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Alert Distribution" subtitle="By severity">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={severityData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                {severityData.map((entry) => (
                  <Cell key={entry.name} fill={SEVERITY_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #eceef0', fontSize: 13 }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Suspicious Activity Timeline" subtitle="Most recent flagged events">
        <Timeline items={suspiciousEvents.map((e) => ({ time: e.time, event: <span>{e.event}</span> }))} />
      </ChartCard>

      <ChartCard title="Recent Alerts" subtitle="Highest severity first" className="!p-0">
        <div className="overflow-x-auto">
          <table className="table-base">
            <thead>
              <tr>
                <th>Alert Type</th>
                <th>User</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {[...alerts].sort((a, b) => ({ Critical: 0, High: 1, Medium: 2, Low: 3 }[a.severity] - { Critical: 0, High: 1, Medium: 2, Low: 3 }[b.severity])).slice(0, 6).map((a) => (
                <tr key={a.id}>
                  <td className="font-medium text-ink-900">{a.type}</td>
                  <td>{a.user}</td>
                  <td><SeverityBadge severity={a.severity} /></td>
                  <td className="text-ink-500">{a.status}</td>
                  <td className="text-ink-500">{a.detectedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
