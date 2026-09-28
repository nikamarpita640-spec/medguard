import { useEffect, useMemo, useState } from 'react';
import { UserPlus } from 'lucide-react';
import * as userService from '../../services/userService';
import { useToast } from '../../context/ToastContext';
import SearchBar from '../../components/SearchBar';
import FilterDropdown from '../../components/FilterDropdown';
import UserTable from '../../components/UserTable';
import Modal from '../../components/Modal';
import ConfirmationModal from '../../components/ConfirmationModal';
import LoadingState from '../../components/LoadingState';

const ROLES = ['doctor', 'nurse', 'security', 'admin'];
const ROLE_LABELS = { doctor: 'Doctor', nurse: 'Nurse', security: 'Security Officer', admin: 'Administrator' };
const DEPARTMENTS = ['Cardiology', 'Oncology', 'Pediatrics', 'Orthopedics', 'Neurology', 'Emergency', 'Radiology', 'Information Security', 'IT Administration'];

const emptyForm = { name: '', email: '', role: 'doctor', department: DEPARTMENTS[0], status: 'Active' };

export default function Users() {
  const { showToast } = useToast();
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('loading');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [viewUser, setViewUser] = useState(null);
  const [toggleTarget, setToggleTarget] = useState(null);

  function load() {
    setStatus('loading');
    userService.getUsers()
      .then((data) => { setUsers(data); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }

  useEffect(load, []);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = !roleFilter || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  async function handleAddUser(e) {
    e.preventDefault();
    if (!form.name || !form.email) {
      showToast('Name and email are required.', 'danger');
      return;
    }
    await userService.addUser(form);
    setAddOpen(false);
    setForm(emptyForm);
    showToast('User added successfully.', 'success');
    load();
  }

  async function confirmToggle() {
    const newStatus = toggleTarget.status === 'Active' ? 'Disabled' : 'Active';
    await userService.updateUserStatus(toggleTarget.id, newStatus);
    showToast(`${toggleTarget.name} was ${newStatus === 'Active' ? 'enabled' : 'disabled'}.`, newStatus === 'Active' ? 'success' : 'warning');
    setToggleTarget(null);
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-ink-900">Users</h1>
          <p className="text-sm text-ink-500 mt-1">Manage clinician, security, and administrator accounts.</p>
        </div>
        <button className="btn-primary" onClick={() => setAddOpen(true)}>
          <UserPlus size={15} /> Add User
        </button>
      </div>

      <div className="card p-4 flex flex-wrap gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name or email..." />
        <FilterDropdown label="All Roles" value={roleFilter} onChange={setRoleFilter} options={ROLES.map((r) => r)} />
      </div>

      <div className="card p-0 overflow-hidden">
        {status === 'loading' ? (
          <LoadingState label="Loading users..." />
        ) : (
          <UserTable
            users={filtered.map((u) => ({ ...u, role: u.role }))}
            onView={setViewUser}
            onEdit={() => showToast('Editing users is not enabled in this demo.', 'info')}
            onToggleStatus={setToggleTarget}
          />
        )}
      </div>

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add User"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setAddOpen(false)}>Cancel</button>
            <button className="btn-primary" onClick={handleAddUser}>Add User</button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={handleAddUser}>
          <div>
            <label className="label">Name</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Dr. Jane Doe" />
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane.doe@medguard.demo" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Role</label>
              <select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                {ROLES.map((r) => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Department</label>
              <select className="input" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}>
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="label">Status</label>
            <select className="input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="Active">Active</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
        </form>
      </Modal>

      <Modal open={!!viewUser} onClose={() => setViewUser(null)} title="User Details">
        {viewUser && (
          <dl className="space-y-3 text-sm">
            <Row label="User ID" value={viewUser.id} />
            <Row label="Name" value={viewUser.name} />
            <Row label="Email" value={viewUser.email} />
            <Row label="Role" value={ROLE_LABELS[viewUser.role]} />
            <Row label="Department" value={viewUser.department} />
            <Row label="Status" value={viewUser.status} />
            <Row label="Last Login" value={viewUser.lastLogin} />
          </dl>
        )}
      </Modal>

      <ConfirmationModal
        open={!!toggleTarget}
        onClose={() => setToggleTarget(null)}
        title={toggleTarget?.status === 'Active' ? 'Disable this user?' : 'Enable this user?'}
        message={
          toggleTarget?.status === 'Active'
            ? `${toggleTarget?.name} will lose access to MedGuard immediately.`
            : `${toggleTarget?.name} will regain access to MedGuard.`
        }
        confirmLabel={toggleTarget?.status === 'Active' ? 'Disable User' : 'Enable User'}
        danger={toggleTarget?.status === 'Active'}
        onConfirm={confirmToggle}
      />
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
