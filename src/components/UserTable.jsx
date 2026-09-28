import { Eye, Pencil, Ban, CheckCircle } from 'lucide-react';
import StatusBadge from './StatusBadge';
import EmptyState from './EmptyState';

const ROLE_LABELS = { doctor: 'Doctor', nurse: 'Nurse', security: 'Security Officer', admin: 'Administrator' };

export default function UserTable({ users, onView, onEdit, onToggleStatus }) {
  if (!users.length) {
    return <EmptyState title="No users found" message="Try a different search term." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-base">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department</th>
            <th>Status</th>
            <th>Last Login</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="font-mono text-xs text-ink-500">{u.id}</td>
              <td className="font-medium text-ink-900">{u.name}</td>
              <td className="text-ink-500">{u.email}</td>
              <td>{ROLE_LABELS[u.role] || u.role}</td>
              <td>{u.department}</td>
              <td><StatusBadge status={u.status} /></td>
              <td className="text-ink-500">{u.lastLogin}</td>
              <td>
                <div className="flex items-center gap-1">
                  <button onClick={() => onView?.(u)} className="btn-ghost !p-1.5" title="View User" aria-label="View user">
                    <Eye size={15} />
                  </button>
                  <button onClick={() => onEdit?.(u)} className="btn-ghost !p-1.5" title="Edit User" aria-label="Edit user">
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => onToggleStatus?.(u)}
                    className="btn-ghost !p-1.5"
                    title={u.status === 'Active' ? 'Disable User' : 'Enable User'}
                    aria-label={u.status === 'Active' ? 'Disable user' : 'Enable user'}
                  >
                    {u.status === 'Active' ? (
                      <Ban size={15} className="text-danger-500" />
                    ) : (
                      <CheckCircle size={15} className="text-success-500" />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
