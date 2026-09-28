import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import SeverityBadge from './SeverityBadge';
import StatusBadge from './StatusBadge';
import EmptyState from './EmptyState';

export default function AlertTable({ alerts }) {
  const navigate = useNavigate();

  if (!alerts.length) {
    return <EmptyState title="No alerts match this filter" message="Try selecting a different severity or status." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-base">
        <thead>
          <tr>
            <th>Alert ID</th>
            <th>Alert Type</th>
            <th>User</th>
            <th>Department</th>
            <th>Severity</th>
            <th>Time</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((a) => (
            <tr key={a.id}>
              <td className="font-mono text-xs text-ink-500">{a.id}</td>
              <td className="font-medium text-ink-900 max-w-xs">{a.type}</td>
              <td>{a.user}</td>
              <td>{a.department}</td>
              <td><SeverityBadge severity={a.severity} /></td>
              <td className="text-ink-500">{a.detectedAt}</td>
              <td><StatusBadge status={a.status} /></td>
              <td>
                <button
                  onClick={() => navigate(`/security/alerts/${a.id}`)}
                  className="btn-ghost !px-2.5 !py-1.5 text-brand-600 hover:bg-brand-50"
                >
                  <Search size={14} /> Investigate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
