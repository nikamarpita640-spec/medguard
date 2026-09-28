import { mockRequest } from './apiClient';
import { users, mockCredentialStore } from '../data/users';

const SESSION_KEY = 'medguard_session';

// Later: POST /api/auth/login -> Supabase Auth signInWithPassword()
export function login(email, password) {
  return mockRequest(() => {
    const normalizedEmail = email.trim().toLowerCase();
    const storedPassword = mockCredentialStore[normalizedEmail];
    if (!storedPassword || storedPassword !== password) {
      const err = new Error('Incorrect email or password.');
      err.code = 'INVALID_CREDENTIALS';
      throw err;
    }
    const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);
    const session = { user, loggedInAt: new Date().toISOString() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  }, { delay: 500 });
}

export function logout() {
  return mockRequest(() => {
    localStorage.removeItem(SESSION_KEY);
    return true;
  }, { delay: 150 });
}

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
