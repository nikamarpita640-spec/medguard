import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import StatusBadge from './StatusBadge';
import EmptyState from './EmptyState';

export default function PatientTable({ patients, showAssignedDoctor = true }) {
  const navigate = useNavigate();

  if (!patients.length) {
    return <EmptyState title="No patients found" message="Try adjusting your search or filters." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-base">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Department</th>
            <th>Diagnosis</th>
            {showAssignedDoctor && <th>Assigned Doctor</th>}
            <th>Last Access</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td className="font-mono text-xs text-ink-500">{p.id}</td>
              <td className="font-medium text-ink-900">{p.name}</td>
              <td>{p.age}</td>
              <td>{p.gender}</td>
              <td>{p.department}</td>
              <td>{p.diagnosis}</td>
              {showAssignedDoctor && <td>{p.assignedDoctor}</td>}
              <td className="text-ink-500">{p.lastAccess}</td>
              <td><StatusBadge status={p.status} /></td>
              <td>
                <button
                  onClick={() => navigate(`/patients/${p.id}`)}
                  className="btn-ghost !px-2.5 !py-1.5 text-brand-600 hover:bg-brand-50"
                >
                  <Eye size={14} /> View Patient
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
