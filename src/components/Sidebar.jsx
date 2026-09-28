import { NavLink } from 'react-router-dom';
import {
  ShieldCheck, LayoutDashboard, Users, FileClock, Siren, Search,
  UserCog, Settings2, Activity, HeartPulse, User,
} from 'lucide-react';

const NAV_BY_ROLE = {
  doctor: [
    { to: '/doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/patients', label: 'Patient Records', icon: HeartPulse },
    { to: '/activity', label: 'My Activity', icon: Activity },
    { to: '/emergency-access', label: 'Emergency Access', icon: Siren },
    { to: '/profile', label: 'Profile', icon: User },
  ],
  nurse: [
    { to: '/doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/patients', label: 'Patient Records', icon: HeartPulse },
    { to: '/activity', label: 'My Activity', icon: Activity },
    { to: '/emergency-access', label: 'Emergency Access', icon: Siren },
    { to: '/profile', label: 'Profile', icon: User },
  ],
  security: [
    { to: '/security/dashboard', label: 'Security Dashboard', icon: LayoutDashboard },
    { to: '/security/alerts', label: 'Alerts', icon: Siren },
    { to: '/security/logs', label: 'Access Logs', icon: FileClock },
    { to: '/security/investigations', label: 'Investigations', icon: Search },
    { to: '/security/users', label: 'Users', icon: Users },
    { to: '/security/rules', label: 'Detection Rules', icon: Settings2 },
    { to: '/profile', label: 'Profile', icon: User },
  ],
  admin: [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/security/users', label: 'Users', icon: Users },
    { to: '/patients', label: 'Patient Records', icon: HeartPulse },
    { to: '/security/logs', label: 'Access Logs', icon: FileClock },
    { to: '/security/alerts', label: 'Security Alerts', icon: Siren },
    { to: '/profile', label: 'Profile', icon: User },
  ],
};

export default function Sidebar({ role }) {
  const items = NAV_BY_ROLE[role] || [];

  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 bg-white border-r border-ink-100 h-screen sticky top-0">
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-ink-100">
        <div className="h-8 w-8 rounded-lg bg-brand-600 text-white flex items-center justify-center">
          <ShieldCheck size={18} />
        </div>
        <div>
          <p className="text-sm font-semibold text-ink-900 leading-none">MedGuard</p>
          <p className="text-[11px] text-ink-400 leading-none mt-0.5">Security Platform</p>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="px-5 py-4 border-t border-ink-100">
        <div className="flex items-center gap-2 text-xs text-ink-400">
          <UserCog size={14} />
          <span>Role-based access active</span>
        </div>
      </div>
    </aside>
  );
}
