import { useNavigate } from 'react-router-dom';
import { LogOut, Pencil, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import StatusBadge from '../components/StatusBadge';

const ROLE_LABELS = { doctor: 'Doctor', nurse: 'Nurse', security: 'Security Officer', admin: 'Administrator' };

function initials(name) {
  return name.split(' ').slice(-2).map((w) => w[0]).join('').toUpperCase();
}

export default function Profile() {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-ink-900">Profile</h1>
        <p className="text-sm text-ink-500 mt-1">Your account details and session information.</p>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-lg font-semibold">
            {initials(user.name)}
          </div>
          <div>
            <p className="text-base font-semibold text-ink-900">{user.name}</p>
            <p className="text-sm text-ink-500">{ROLE_LABELS[user.role]} &middot; {user.department}</p>
          </div>
        </div>

        <dl className="space-y-3 text-sm border-t border-ink-100 pt-5">
          <Row label="Email" value={user.email} />
          <Row label="Role" value={ROLE_LABELS[user.role]} />
          <Row label="Department" value={user.department} />
          <Row label="Last Login" value={user.lastLogin} />
          <Row label="Account Status" value={<StatusBadge status={user.status} />} />
        </dl>

        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-ink-100">
          <button className="btn-secondary" onClick={() => showToast('Profile editing is not enabled in this demo.', 'info')}>
            <Pencil size={15} /> Edit Profile
          </button>
          <button className="btn-secondary" onClick={() => showToast('Password change is not enabled in this demo.', 'info')}>
            <KeyRound size={15} /> Change Password
          </button>
          <button className="btn-danger ml-auto" onClick={handleLogout}>
            <LogOut size={15} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-ink-400">{label}</dt>
      <dd className="text-ink-800 font-medium text-right">{value}</dd>
    </div>
  );
}
