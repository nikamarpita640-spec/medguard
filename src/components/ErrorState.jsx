import { AlertOctagon } from 'lucide-react';

export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      <div className="h-12 w-12 rounded-full bg-danger-50 text-danger-600 flex items-center justify-center mb-4">
        <AlertOctagon size={22} />
      </div>
      <p className="text-sm font-medium text-ink-700">{message}</p>
      {onRetry && (
        <button className="btn-secondary mt-4" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
