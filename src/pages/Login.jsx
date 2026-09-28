import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Eye, EyeOff, Loader2, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { demoCredentials } from '../data/users';

const ROLE_HOME = {
  doctor: '/doctor/dashboard',
  nurse: '/doctor/dashboard',
  security: '/security/dashboard',
  admin: '/admin/dashboard',
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Enter both your email and password to continue.');
      return;
    }
    setLoading(true);
    try {
      const user = await login(email, password);
      const redirectTo = location.state?.from?.pathname || ROLE_HOME[user.role] || '/';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function fillDemo(cred) {
    setEmail(cred.email);
    setPassword(cred.password);
    setError('');
  }

  return (
    <div className="min-h-screen bg-ink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 rounded-xl bg-brand-600 text-white flex items-center justify-center mb-4">
            <ShieldCheck size={26} />
          </div>
          <h1 className="text-xl font-semibold text-ink-900">MedGuard</h1>
          <p className="text-sm text-ink-500 mt-2 text-center max-w-xs">
            Protect patient records by detecting suspicious access before it becomes a security incident.
          </p>
        </div>

        <div className="card p-6">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label htmlFor="email" className="label">Email</label>
              <input
                id="email"
                type="email"
                className="input"
                placeholder="you@medguard.demo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="label">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="input pr-10"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-5">
              <label className="flex items-center gap-2 text-sm text-ink-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-ink-300 text-brand-600 focus:ring-brand-400"
                />
                Remember me
              </label>
              <button type="button" className="text-sm text-brand-600 hover:text-brand-700 font-medium">
                Forgot password?
              </button>
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-danger-50 border border-danger-100 text-danger-700 text-sm px-3 py-2.5">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              {loading ? 'Signing in...' : 'Log In'}
            </button>
          </form>
        </div>

        <div className="card p-4 mt-4 bg-brand-50/40 border-brand-100">
          <div className="flex items-start gap-2 mb-3">
            <Info size={15} className="text-brand-600 mt-0.5 shrink-0" />
            <p className="text-xs text-ink-600">
              This is a hackathon demo. Use any account below — click one to autofill the login form.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {demoCredentials.map((cred) => (
              <button
                key={cred.email}
                onClick={() => fillDemo(cred)}
                className="text-left rounded-lg border border-ink-200 bg-white px-3 py-2 hover:border-brand-300 hover:bg-brand-50 transition-colors"
              >
                <p className="text-xs font-semibold text-ink-800">{cred.role}</p>
                <p className="text-[11px] text-ink-400 truncate">{cred.email}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
