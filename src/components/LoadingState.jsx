import { Loader2 } from 'lucide-react';

export default function LoadingState({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-ink-400">
      <Loader2 className="animate-spin mb-3" size={24} />
      <p className="text-sm">{label}</p>
    </div>
  );
}
