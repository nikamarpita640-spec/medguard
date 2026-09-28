import { useEffect, useMemo, useState } from 'react';
import * as patientService from '../services/patientService';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import PatientTable from '../components/PatientTable';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export default function PatientRecords() {
  const [patients, setPatients] = useState([]);
  const [status, setStatus] = useState('loading');
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');

  function load() {
    setStatus('loading');
    patientService.getPatients()
      .then((data) => { setPatients(data); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }

  useEffect(load, []);

  const departments = useMemo(() => [...new Set(patients.map((p) => p.department))], [patients]);
  const statuses = useMemo(() => [...new Set(patients.map((p) => p.status))], [patients]);

  const filtered = useMemo(() => {
    let list = patients.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        p.diagnosis.toLowerCase().includes(search.toLowerCase());
      const matchesDept = !department || p.department === department;
      const matchesStatus = !statusFilter || p.status === statusFilter;
      return matchesSearch && matchesDept && matchesStatus;
    });

    switch (sortBy) {
      case 'name-asc': list = [...list].sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name-desc': list = [...list].sort((a, b) => b.name.localeCompare(a.name)); break;
      case 'age-asc': list = [...list].sort((a, b) => a.age - b.age); break;
      case 'age-desc': list = [...list].sort((a, b) => b.age - a.age); break;
      default: break;
    }
    return list;
  }, [patients, search, department, statusFilter, sortBy]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-ink-900">Patient Records</h1>
        <p className="text-sm text-ink-500 mt-1">Search and review patient records within your authorization scope.</p>
      </div>

      <div className="card p-4 flex flex-wrap gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name, ID, or diagnosis..." />
        <FilterDropdown label="All Departments" value={department} onChange={setDepartment} options={departments} />
        <FilterDropdown label="All Statuses" value={statusFilter} onChange={setStatusFilter} options={statuses} />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input w-auto min-w-[160px] cursor-pointer">
          <option value="name-asc">Name (A–Z)</option>
          <option value="name-desc">Name (Z–A)</option>
          <option value="age-asc">Age (Low–High)</option>
          <option value="age-desc">Age (High–Low)</option>
        </select>
      </div>

      <div className="card p-0 overflow-hidden">
        {status === 'loading' && <LoadingState label="Loading patient records..." />}
        {status === 'error' && <ErrorState onRetry={load} />}
        {status === 'ready' && (
          <>
            <div className="px-5 py-3 border-b border-ink-100 text-xs text-ink-500">
              Showing {filtered.length} of {patients.length} patients
            </div>
            <PatientTable patients={filtered} />
          </>
        )}
      </div>
    </div>
  );
}
