import { mockRequest } from './apiClient';
import { patients } from '../data/patients';

// Later: GET /api/patients
export function getPatients() {
  return mockRequest([...patients]);
}

// Later: GET /api/patients/:id
export function getPatientById(id) {
  return mockRequest(() => patients.find((p) => p.id === id) || null);
}

// Later: PATCH /api/patients/:id
export function updatePatientRecord(id, updates) {
  return mockRequest(() => {
    const patient = patients.find((p) => p.id === id);
    if (patient) Object.assign(patient, updates);
    return patient;
  }, { delay: 400 });
}
