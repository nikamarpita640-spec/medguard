import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import * as accessLogService from '../services/accessLogService';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';

function toBadgeStatus(log) {
  if (log.result === 'Denied') return 'Denied';
  if (log.action.toLowerCase().includes('emergency')) return 'Emergency';
  if (log.risk === 'Suspicious') return 'Suspicious';
  return 'Allowed';
}

export default function MyActivity() {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    accessLogService.getAccessLogsForUser(user.name)
      .then((data) => { setLogs(data); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }, [user.name]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-ink-900">My Activity</h1>
        <p className="text-sm text-ink-500 mt-1">Your personal patient-record access history.</p>
      </div>

      <div className="card p-0 overflow-hidden">
        {status === 'loading' && <LoadingState label="Loading your activity..." />}
        {status === 'ready' && logs.length === 0 && (
          <EmptyState title="No activity recorded yet" message="Your record access history will appear here." />
        )}
        {status === 'ready' && logs.length > 0 && (
          <div className="overflow-x-auto">
            <table className="table-base">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Action</th>
                  <th>Date / Time</th>
                  <th>Result</th>
                  <th>Access Reason</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td className="font-medium text-ink-900">{log.patient}</td>
                    <td>{log.action}</td>
                    <td className="text-ink-500">{log.timestamp}</td>
                    <td><StatusBadge status={toBadgeStatus(log)} /></td>
                    <td className="text-ink-500">
                      {log.result === 'Denied' ? 'Outside authorized department' : 'Routine clinical review'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
