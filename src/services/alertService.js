import { mockRequest } from './apiClient';
import { alerts } from '../data/alerts';

// Later: GET /api/alerts
export function getAlerts() {
  return mockRequest([...alerts]);
}

// Later: GET /api/alerts/:id
export function getAlertById(id) {
  return mockRequest(() => alerts.find((a) => a.id === id) || null);
}

// Later: PATCH /api/alerts/:id/status
export function updateAlertStatus(id, status) {
  return mockRequest(() => {
    const alert = alerts.find((a) => a.id === id);
    if (alert) alert.status = status;
    return alert;
  }, { delay: 300 });
}

// Later: POST /api/alerts/:id/notes
export function addInvestigationNote(id, author, text) {
  return mockRequest(() => {
    const alert = alerts.find((a) => a.id === id);
    if (alert) {
      alert.notes.push({ author, text, time: 'Just now' });
    }
    return alert;
  }, { delay: 300 });
}
