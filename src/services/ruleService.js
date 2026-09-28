import { mockRequest } from './apiClient';
import { rules } from '../data/rules';

// Later: GET /api/rules
export function getRules() {
  return mockRequest([...rules]);
}

// Later: PATCH /api/rules/:id
export function toggleRule(id) {
  return mockRequest(() => {
    const rule = rules.find((r) => r.id === id);
    if (rule) {
      rule.enabled = !rule.enabled;
      rule.status = rule.enabled ? 'Active' : 'Disabled';
    }
    return rule;
  }, { delay: 200 });
}
