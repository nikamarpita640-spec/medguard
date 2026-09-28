import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, LogOut, User as UserIcon, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ROLE_LABELS = { doctor: 'Doctor', nurse: 'Nurse', security: 'Security Officer', admin: 'Administrator' };

function initials(name) {
  return name
    .split(' ')
    .filter((w) => w.length > 1 || /[A-Za-z]/.test(w))
    .slice(-2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export default function TopNavbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  if (!user) return null;

  return (
    <header className="h-16 border-b border-ink-100 bg-white flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      <button onClick={onMenuClick} className="md:hidden btn-ghost !p-2" aria-label="Open menu">
        <Menu size={20} />
      </button>
      <div className="hidden md:block" />
      <div className="flex items-center gap-4">
        <button className="btn-ghost !p-2 relative" aria-label="Notifications">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-danger-500" />
        </button>
        <div className="relative" ref={ref}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-lg hover:bg-ink-50"
          >
            <div className="h-8 w-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-semibold">
              {initials(user.name)}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-ink-800 leading-none">{user.name}</p>
              <p className="text-xs text-ink-400 leading-none mt-1">{ROLE_LABELS[user.role]} &middot; {user.department}</p>
            </div>
            <ChevronDown size={15} className="text-ink-400" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 card p-1.5 z-40">
              <button
                onClick={() => { setMenuOpen(false); navigate('/profile'); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-ink-700 hover:bg-ink-50"
              >
                <UserIcon size={15} /> Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-danger-600 hover:bg-danger-50"
              >
                <LogOut size={15} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
