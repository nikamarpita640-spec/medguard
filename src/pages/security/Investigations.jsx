import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, User } from 'lucide-react';
import * as alertService from '../../services/alertService';
import SeverityBadge from '../../components/SeverityBadge';
import StatusBadge from '../../components/StatusBadge';
import LoadingState from '../../components/LoadingState';
import EmptyState from '../../components/EmptyState';

export default function Investigations() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    alertService.getAlerts()
      .then((data) => { setAlerts(data); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }, []);

  if (status === 'loading') return <LoadingState label="Loading investigations..." />;

  const active = alerts.filter((a) => a.status === 'Open' || a.status === 'Investigating');
  const closed = alerts.filter((a) => a.status === 'Resolved' || a.status === 'False Positive');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-ink-900">Investigations</h1>
        <p className="text-sm text-ink-500 mt-1">Active and past security investigations across all alerts.</p>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-ink-700 mb-3">Active ({active.length})</h2>
        {active.length === 0 ? (
          <EmptyState title="No active investigations" message="All clear — no open or in-progress investigations right now." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {active.map((a) => (
              <button
                key={a.id}
                onClick={() => navigate(`/security/alerts/${a.id}`)}
                className="card p-5 text-left hover:border-brand-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <SeverityBadge severity={a.severity} />
                  <StatusBadge status={a.status} />
                </div>
                <p className="text-sm font-semibold text-ink-900">{a.type}</p>
                <p className="text-xs text-ink-500 mt-2 line-clamp-2">{a.summary}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-ink-400">
                  <span className="flex items-center gap-1"><User size={12} /> {a.user}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {a.detectedAt}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-sm font-semibold text-ink-700 mb-3">Closed ({closed.length})</h2>
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table-base">
              <thead>
                <tr>
                  <th>Alert</th>
                  <th>User</th>
                  <th>Severity</th>
                  <th>Outcome</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {closed.map((a) => (
                  <tr key={a.id}>
                    <td className="font-medium text-ink-900">{a.type}</td>
                    <td>{a.user}</td>
                    <td><SeverityBadge severity={a.severity} /></td>
                    <td><StatusBadge status={a.status} /></td>
                    <td>
                      <button onClick={() => navigate(`/security/alerts/${a.id}`)} className="btn-ghost !px-2.5 !py-1.5 text-brand-600 hover:bg-brand-50">
                        <Search size={14} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
