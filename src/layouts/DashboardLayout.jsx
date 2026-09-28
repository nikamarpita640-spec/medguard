import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { X, ShieldCheck } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout() {
  const { user } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-ink-50">
      <div className="hidden md:block">
        <Sidebar role={user.role} />
      </div>

      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-ink-900/40" onClick={() => setMobileNavOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl">
            <div className="flex items-center justify-between px-5 h-16 border-b border-ink-100">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-brand-600 text-white flex items-center justify-center">
                  <ShieldCheck size={18} />
                </div>
                <p className="text-sm font-semibold text-ink-900">MedGuard</p>
              </div>
              <button onClick={() => setMobileNavOpen(false)} className="btn-ghost !p-2" aria-label="Close menu">
                <X size={18} />
              </button>
            </div>
            <div onClick={() => setMobileNavOpen(false)}>
              <Sidebar role={user.role} />
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <TopNavbar onMenuClick={() => setMobileNavOpen(true)} />
        <main className="flex-1 p-4 md:p-6 max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
