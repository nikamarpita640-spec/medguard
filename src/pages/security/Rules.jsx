import { useEffect, useState } from 'react';
import { ShieldAlert, KeyRound, Users2, FolderLock, Siren } from 'lucide-react';
import * as ruleService from '../../services/ruleService';
import { useToast } from '../../context/ToastContext';
import LoadingState from '../../components/LoadingState';
import StatusBadge from '../../components/StatusBadge';

const ICONS = { 'RULE-1': KeyRound, 'RULE-2': Users2, 'RULE-3': FolderLock, 'RULE-4': Siren };

export default function Rules() {
  const { showToast } = useToast();
  const [rules, setRules] = useState([]);
  const [status, setStatus] = useState('loading');

  function load() {
    ruleService.getRules().then((data) => { setRules(data); setStatus('ready'); });
  }

  useEffect(load, []);

  async function handleToggle(rule) {
    await ruleService.toggleRule(rule.id);
    showToast(`${rule.name} ${rule.enabled ? 'disabled' : 'enabled'}.`, rule.enabled ? 'warning' : 'success');
    load();
  }

  if (status === 'loading') return <LoadingState label="Loading detection rules..." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-ink-900">Detection Rules</h1>
        <p className="text-sm text-ink-500 mt-1">
          The thresholds MedGuard uses to flag suspicious access. Rules run automatically against the access log stream.
        </p>
      </div>

      <div className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 flex items-start gap-2.5">
        <ShieldAlert size={17} className="text-brand-600 mt-0.5 shrink-0" />
        <p className="text-sm text-brand-700">
          Toggling a rule off in this demo only affects the UI — no live detection logic is disabled.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {rules.map((rule) => {
          const Icon = ICONS[rule.id] || ShieldAlert;
          return (
            <div key={rule.id} className="card p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{rule.name}</p>
                    <p className="text-xs text-ink-400 mt-0.5">{rule.id}</p>
                  </div>
                </div>
                <button
                  role="switch"
                  aria-checked={rule.enabled}
                  onClick={() => handleToggle(rule)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    rule.enabled ? 'bg-brand-600' : 'bg-ink-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${rule.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <p className="text-sm text-ink-600 mt-4">{rule.description}</p>

              <div className="mt-4 pt-4 border-t border-ink-100 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-ink-400">Trigger Condition</p>
                  <p className="text-ink-700 mt-0.5">{rule.trigger}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-400">Threshold</p>
                  <p className="text-ink-700 mt-0.5 font-medium">{rule.threshold}</p>
                </div>
              </div>

              <div className="mt-4">
                <StatusBadge status={rule.enabled ? 'Active' : 'Disabled'} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
