// Synthetic audit log entries — 50+ rows mixing normal and suspicious access.
import { patients } from './patients';
import { users } from './users';

const actions = ['Viewed Record', 'Updated Record', 'Viewed Lab Results', 'Downloaded Report', 'Viewed Medication History'];
const results = ['Success', 'Success', 'Success', 'Success', 'Denied'];
const clinicalUsers = users.filter((u) => u.role === 'doctor' || u.role === 'nurse');

function ip(seed) {
  return `10.${(seed * 13) % 255}.${(seed * 29) % 255}.${(seed * 7) % 255}`;
}
function timeAgo(seed) {
  const mins = (seed * 11) % (60 * 24 * 3);
  const d = new Date(Date.now() - mins * 60000);
  return d.toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export const accessLogs = Array.from({ length: 58 }).map((_, i) => {
  const user = clinicalUsers[i % clinicalUsers.length];
  const patient = patients[i % patients.length];
  const isDenied = i % 9 === 0;
  const isSuspicious = i % 13 === 0 || isDenied;
  const sameDept = user.department === patient.department;
  return {
    id: `LOG-${5000 + i}`,
    userId: user.id,
    user: user.name,
    role: user.role === 'doctor' ? 'Doctor' : 'Nurse',
    department: user.department,
    patient: patient.name,
    patientId: patient.id,
    action: !sameDept && isDenied ? 'Attempted Record Access (Wrong Department)' : actions[i % actions.length],
    timestamp: timeAgo(i + 1),
    ip: ip(i + 1),
    result: isDenied ? 'Denied' : results[i % results.length],
    risk: isSuspicious ? 'Suspicious' : 'Normal',
  };
});
