import StatusBadge from './StatusBadge';
import EmptyState from './EmptyState';

export default function AccessLogTable({ logs }) {
  if (!logs.length) {
    return <EmptyState title="No log entries found" message="Try adjusting your filters or date range." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-base">
        <thead>
          <tr>
            <th>Log ID</th>
            <th>User</th>
            <th>Role</th>
            <th>Patient</th>
            <th>Action</th>
            <th>Timestamp</th>
            <th>IP Address</th>
            <th>Result</th>
            <th>Risk</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td className="font-mono text-xs text-ink-500">{log.id}</td>
              <td className="font-medium text-ink-900">{log.user}</td>
              <td>{log.role}</td>
              <td>{log.patient}</td>
              <td>{log.action}</td>
              <td className="text-ink-500">{log.timestamp}</td>
              <td className="font-mono text-xs text-ink-500">{log.ip}</td>
              <td><StatusBadge status={log.result} /></td>
              <td><StatusBadge status={log.risk} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
