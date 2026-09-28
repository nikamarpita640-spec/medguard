import { useEffect, useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import * as accessLogService from '../../services/accessLogService';
import SearchBar from '../../components/SearchBar';
import FilterDropdown from '../../components/FilterDropdown';
import AccessLogTable from '../../components/AccessLogTable';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import { useToast } from '../../context/ToastContext';

export default function AccessLogs() {
  const { showToast } = useToast();
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('loading');
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [result, setResult] = useState('');
  const [risk, setRisk] = useState('');

  function load() {
    setStatus('loading');
    accessLogService.getAccessLogs()
      .then((data) => { setLogs(data); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }

  useEffect(load, []);

  const departments = useMemo(() => [...new Set(logs.map((l) => l.department))], [logs]);

  const filtered = useMemo(() => {
    return logs.filter((l) => {
      const matchesSearch =
        !search ||
        l.user.toLowerCase().includes(search.toLowerCase()) ||
        l.patient.toLowerCase().includes(search.toLowerCase()) ||
        l.id.toLowerCase().includes(search.toLowerCase());
      const matchesDept = !department || l.department === department;
      const matchesResult = !result || l.result === result;
      const matchesRisk = !risk || l.risk === risk;
      return matchesSearch && matchesDept && matchesResult && matchesRisk;
    });
  }, [logs, search, department, result, risk]);

  function handleExport() {
    showToast(`Exported ${filtered.length} log entries to CSV.`, 'success');
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-ink-900">Access Logs</h1>
          <p className="text-sm text-ink-500 mt-1">Complete audit trail of patient record access across the hospital.</p>
        </div>
        <button className="btn-secondary" onClick={handleExport}>
          <Download size={15} /> Export CSV
        </button>
      </div>

      <div className="card p-4 flex flex-wrap gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by user, patient, or log ID..." />
        <FilterDropdown label="All Departments" value={department} onChange={setDepartment} options={departments} />
        <FilterDropdown label="All Results" value={result} onChange={setResult} options={['Success', 'Denied']} />
        <FilterDropdown label="All Risk Levels" value={risk} onChange={setRisk} options={['Normal', 'Suspicious']} />
      </div>

      <div className="card p-0 overflow-hidden">
        {status === 'loading' && <LoadingState label="Loading access logs..." />}
        {status === 'error' && <ErrorState onRetry={load} />}
        {status === 'ready' && (
          <>
            <div className="px-5 py-3 border-b border-ink-100 text-xs text-ink-500">
              Showing {filtered.length} of {logs.length} log entries
            </div>
            <AccessLogTable logs={filtered} />
          </>
        )}
      </div>
    </div>
  );
}
