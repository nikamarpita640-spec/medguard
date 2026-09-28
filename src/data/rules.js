// Detection rules the (simulated) engine evaluates against the access log stream.
export const rules = [
  {
    id: 'RULE-1',
    name: 'Failed Login Detection',
    description: 'Flags accounts under credential-stuffing or brute-force attempts.',
    trigger: '5 or more failed login attempts occur within 5 minutes.',
    threshold: '5 attempts / 5 min',
    status: 'Active',
    enabled: true,
  },
  {
    id: 'RULE-2',
    name: 'Mass Record Access',
    description: 'Flags a single user pulling an unusually large number of patient records in a short window — a common sign of data exfiltration or credential misuse.',
    trigger: 'More than 50 patient records are accessed within 10 minutes.',
    threshold: '50 records / 10 min',
    status: 'Active',
    enabled: true,
  },
  {
    id: 'RULE-3',
    name: 'Unauthorized Department Access',
    description: 'Flags access attempts outside a clinician\u2019s assigned department, where no care relationship exists.',
    trigger: 'A user attempts to access a patient outside their authorized department.',
    threshold: 'Any cross-department attempt',
    status: 'Active',
    enabled: true,
  },
  {
    id: 'RULE-4',
    name: 'Emergency Exception',
    description: 'Prevents legitimate emergency response from being misclassified as suspicious mass access, while still preserving a full audit trail.',
    trigger: 'User is an authorized clinician, emergency mode is active, and high-volume access occurs.',
    threshold: 'Suppresses Rule 2 while emergency mode is active',
    status: 'Active',
    enabled: true,
  },
];
