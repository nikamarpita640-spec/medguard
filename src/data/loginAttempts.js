// Synthetic login attempt history, used to power the "repeated failure" detection demo.
import { users } from './users';

function timeAgo(mins) {
  const d = new Date(Date.now() - mins * 60000);
  return d.toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export const loginAttempts = [
  { id: 'LG-1', user: 'Nurse Devika Menon', email: 'devika.menon@medguard.demo', result: 'Failed', reason: 'Incorrect password', timestamp: timeAgo(4), ip: '10.44.12.9' },
  { id: 'LG-2', user: 'Nurse Devika Menon', email: 'devika.menon@medguard.demo', result: 'Failed', reason: 'Incorrect password', timestamp: timeAgo(6), ip: '10.44.12.9' },
  { id: 'LG-3', user: 'Nurse Devika Menon', email: 'devika.menon@medguard.demo', result: 'Failed', reason: 'Incorrect password', timestamp: timeAgo(7), ip: '10.44.12.9' },
  { id: 'LG-4', user: 'Nurse Devika Menon', email: 'devika.menon@medguard.demo', result: 'Failed', reason: 'Incorrect password', timestamp: timeAgo(8), ip: '10.44.12.9' },
  { id: 'LG-5', user: 'Nurse Devika Menon', email: 'devika.menon@medguard.demo', result: 'Failed', reason: 'Incorrect password', timestamp: timeAgo(9), ip: '10.44.12.9' },
  { id: 'LG-6', user: 'Nurse Devika Menon', email: 'devika.menon@medguard.demo', result: 'Success', reason: '—', timestamp: timeAgo(9.5), ip: '10.44.12.9' },
  { id: 'LG-7', user: 'Dr. Rahul Sharma', email: 'doctor@medguard.demo', result: 'Success', reason: '—', timestamp: timeAgo(190), ip: '10.12.4.21' },
  { id: 'LG-8', user: 'Dr. Amit Patil', email: 'amit.patil@medguard.demo', result: 'Success', reason: '—', timestamp: timeAgo(210), ip: '10.12.9.55' },
  { id: 'LG-9', user: 'Unknown', email: 'randomuser@medguard.demo', result: 'Failed', reason: 'Account does not exist', timestamp: timeAgo(320), ip: '203.0.113.44' },
  { id: 'LG-10', user: 'Kabir Mehta', email: 'security@medguard.demo', result: 'Success', reason: '—', timestamp: timeAgo(420), ip: '10.12.1.5' },
];
