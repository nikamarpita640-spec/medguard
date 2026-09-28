# MedGuard — Healthcare Security & Suspicious Access Detection Platform

> Protect patient records by detecting suspicious access before it becomes a security incident.

A hackathon MVP demonstrating role-based access control, audit logging, suspicious-activity
detection, security alerting, and investigation workflows for a hospital patient records system.
Built with **React, Vite, Tailwind CSS, React Router, and Recharts**, using fully synthetic
mock data — no real patient information anywhere in the codebase.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Demo accounts

| Role | Email | Password |
|---|---|---|
| Doctor | doctor@medguard.demo | doctor123 |
| Nurse | nurse@medguard.demo | nurse123 |
| Security Officer | security@medguard.demo | security123 |
| Administrator | admin@medguard.demo | admin123 |

## Demo script (matches the six hackathon scenarios)

1. **Normal access** — Log in as Doctor → Patient Records → open any patient → "View Record" is logged.
2. **Unauthorized access** — Log in as Nurse, open a patient in a different department; the access-denied
   pattern is reflected in Access Logs (`Attempted Record Access (Wrong Department)` rows, risk = Suspicious).
3. **Repeated login failure** — Log in as Security Officer → Security Dashboard shows Failed Logins; the
   underlying data is in `src/data/loginAttempts.js` (5 failed attempts within 5 minutes → `ALRT-9003`).
4. **Mass record access** — Security Officer → Alerts → open `ALRT-9001` ("Unusually High Patient Record
   Access") to see the full evidence package and timeline for Dr. Amit Patil's 87-record access.
5. **Emergency access** — Log in as Doctor → Emergency Access → submit the form → confirmation banner
   explains the activity is logged but not treated as a mass-access event. See `ALRT-9005` for the
   already-resolved example of Rule 4 suppressing an alert.
6. **Security investigation** — Security Officer → Alerts → open any alert → review Evidence and Timeline →
   add an investigation note → Resolve Alert.

## Project structure

```
src/
  components/   Reusable UI building blocks (tables, badges, modals, states, nav)
  layouts/      DashboardLayout (sidebar + top navbar shell)
  pages/        Route-level pages, grouped by role (doctor/, security/, admin/)
  data/         Synthetic mock data (users, patients, logs, alerts, rules)
  services/     Service layer — swap the internals for real API calls later
  context/      AuthContext (session) and ToastContext (notifications)
```

## Connecting a real backend later

Each file in `src/services/` wraps its data access in a function with a stable signature
(e.g. `getPatients()`, `login(email, password)`, `updateAlertStatus(id, status)`). To connect
Supabase + an Express API:

1. Replace the body of each service function with a `fetch()` call to your Express API, or a
   Supabase client call.
2. Keep the function signatures and return shapes the same — no page or component needs to change.
3. Move `authService.getSession()` to read from Supabase Auth's session instead of `localStorage`.
4. Add a `.env` file for your API base URL / Supabase keys (not included, since this MVP ships
   with mock data only).

## What this MVP intentionally leaves out

Per the project brief: no blockchain, no real ML models, no real hospital integrations, no real
patient data, no SIEM integration, no payments. Detection "rules" are illustrated with static mock
data rather than a live streaming engine — the `src/data/alerts.js` file documents exactly which
rule and threshold produced each example alert, so the detection logic is easy to reason about and
easy to replace with a real rules engine later.
