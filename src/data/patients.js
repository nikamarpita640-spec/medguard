// Synthetic patient records for demo purposes only. No real medical data.
const departments = ['Cardiology', 'Oncology', 'Pediatrics', 'Orthopedics', 'Neurology', 'Emergency', 'Radiology'];
const diagnoses = [
  'Hypertension', 'Type 2 Diabetes', 'Coronary Artery Disease', 'Fractured Femur', 'Asthma',
  'Migraine', 'Pneumonia', 'Chronic Kidney Disease', 'Appendicitis', 'Epilepsy',
  'Breast Carcinoma (Stage II)', 'Rheumatoid Arthritis', 'Gastroenteritis', 'Anemia', 'Stroke (Ischemic)',
  'Bronchitis', 'Osteoarthritis', 'Thyroid Nodule', 'Lower Back Pain', 'Atrial Fibrillation',
];
const firstNames = ['Aarav','Vivaan','Aditya','Diya','Ananya','Ishaan','Kavya','Rohan','Meera','Aryan','Saanvi','Kabir','Riya','Aditi','Arjun','Zara','Neel','Tara','Yash','Anika','Dhruv','Ira','Vihaan','Myra','Reyansh','Naina','Advait','Pari','Krish','Sara'];
const lastNames = ['Sharma','Verma','Nair','Iyer','Reddy','Mehta','Kulkarni','Joshi','Patil','Rao','Kapoor','Menon','Sheikh','Qureshi','Bose','Chatterjee','Desai','Gupta','Malhotra','Pillai'];
const doctors = ['Dr. Rahul Sharma','Dr. Amit Patil','Dr. Sneha Kulkarni','Dr. Vikram Iyer','Dr. Neha Joshi'];
const statuses = ['Active','Discharged','Under Observation'];

function pick(arr, i) { return arr[i % arr.length]; }
function seededMinutesAgo(seed) {
  const mins = (seed * 37) % (60 * 24 * 5); // spread across last 5 days
  const d = new Date(Date.now() - mins * 60000);
  return d.toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export const patients = Array.from({ length: 34 }).map((_, i) => {
  const id = `P-${2001 + i}`;
  const name = `${pick(firstNames, i)} ${pick(lastNames, i + 3)}`;
  return {
    id,
    name,
    age: 18 + ((i * 7) % 65),
    gender: i % 2 === 0 ? 'Male' : 'Female',
    department: pick(departments, i),
    diagnosis: pick(diagnoses, i),
    assignedDoctor: pick(doctors, i),
    lastAccess: seededMinutesAgo(i + 1),
    status: pick(statuses, i),
    medicalHistory: [
      'No known drug allergies.',
      `Diagnosed with ${pick(diagnoses, i)} — under continued monitoring.`,
      i % 3 === 0 ? 'Family history of cardiovascular disease.' : 'No significant family history reported.',
    ],
    currentTreatment: i % 2 === 0
      ? 'Prescribed daily medication with scheduled follow-up in 2 weeks.'
      : 'Physical therapy plan with bi-weekly review.',
    lastVisit: seededMinutesAgo(i + 2),
  };
});
