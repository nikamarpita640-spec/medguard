// Mock user directory. In production this is served by GET /api/users (Supabase `users` table).
export const users = [
  { id: 'U-1001', name: 'Dr. Rahul Sharma', email: 'doctor@medguard.demo', role: 'doctor', department: 'Cardiology', status: 'Active', lastLogin: '2026-09-28 08:14 AM' },
  { id: 'U-1002', name: 'Nurse Priya Nair', email: 'nurse@medguard.demo', role: 'nurse', department: 'Emergency', status: 'Active', lastLogin: '2026-09-28 07:52 AM' },
  { id: 'U-1003', name: 'Kabir Mehta', email: 'security@medguard.demo', role: 'security', department: 'Information Security', status: 'Active', lastLogin: '2026-09-28 06:30 AM' },
  { id: 'U-1004', name: 'Ananya Rao', email: 'admin@medguard.demo', role: 'admin', department: 'IT Administration', status: 'Active', lastLogin: '2026-09-27 09:10 PM' },
  { id: 'U-1005', name: 'Dr. Amit Patil', role: 'doctor', email: 'amit.patil@medguard.demo', department: 'Oncology', status: 'Active', lastLogin: '2026-09-28 10:21 AM' },
  { id: 'U-1006', name: 'Dr. Sneha Kulkarni', role: 'doctor', email: 'sneha.kulkarni@medguard.demo', department: 'Pediatrics', status: 'Active', lastLogin: '2026-09-28 09:02 AM' },
  { id: 'U-1007', name: 'Nurse Farah Sheikh', role: 'nurse', email: 'farah.sheikh@medguard.demo', department: 'Cardiology', status: 'Active', lastLogin: '2026-09-27 05:44 PM' },
  { id: 'U-1008', name: 'Dr. Vikram Iyer', role: 'doctor', email: 'vikram.iyer@medguard.demo', department: 'Orthopedics', status: 'Disabled', lastLogin: '2026-09-14 11:12 AM' },
  { id: 'U-1009', name: 'Nurse Devika Menon', role: 'nurse', email: 'devika.menon@medguard.demo', department: 'Neurology', status: 'Active', lastLogin: '2026-09-28 07:00 AM' },
  { id: 'U-1010', name: 'Rohan Kapoor', role: 'security', email: 'rohan.kapoor@medguard.demo', department: 'Information Security', status: 'Active', lastLogin: '2026-09-28 06:45 AM' },
  { id: 'U-1011', name: 'Dr. Neha Joshi', role: 'doctor', email: 'neha.joshi@medguard.demo', department: 'Radiology', status: 'Active', lastLogin: '2026-09-26 02:30 PM' },
  { id: 'U-1012', name: 'Imran Qureshi', role: 'admin', email: 'imran.qureshi@medguard.demo', department: 'IT Administration', status: 'Active', lastLogin: '2026-09-27 04:15 PM' },
];

export const demoCredentials = [
  { role: 'Doctor', email: 'doctor@medguard.demo', password: 'doctor123' },
  { role: 'Nurse', email: 'nurse@medguard.demo', password: 'nurse123' },
  { role: 'Security Officer', email: 'security@medguard.demo', password: 'security123' },
  { role: 'Administrator', email: 'admin@medguard.demo', password: 'admin123' },
];

// Password map kept separate from the user directory, mirroring how a real auth
// provider (e.g. Supabase Auth) would never return credentials alongside profile data.
export const mockCredentialStore = {
  'doctor@medguard.demo': 'doctor123',
  'nurse@medguard.demo': 'nurse123',
  'security@medguard.demo': 'security123',
  'admin@medguard.demo': 'admin123',
};
