import { mockRequest } from './apiClient';
import { accessLogs } from '../data/accessLogs';
import { loginAttempts } from '../data/loginAttempts';

// Later: GET /api/access-logs
export function getAccessLogs() {
  return mockRequest([...accessLogs]);
}

// Later: GET /api/access-logs?user=
export function getAccessLogsForUser(userName) {
  return mockRequest(accessLogs.filter((log) => log.user === userName));
}

// Later: GET /api/login-attempts
export function getLoginAttempts() {
  return mockRequest([...loginAttempts]);
}

// Records a single access event. Later: POST /api/access-logs
export function recordAccess(entry) {
  return mockRequest(() => {
    const log = {
      id: `LOG-${5000 + accessLogs.length + 1}`,
      timestamp: new Date().toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      ip: '10.12.4.21',
      ...entry,
    };
    accessLogs.unshift(log);
    return log;
  }, { delay: 200 });
}
