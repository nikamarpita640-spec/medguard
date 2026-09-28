import { Inbox } from 'lucide-react';

export default function EmptyState({ icon: Icon = Inbox, title = 'Nothing here yet', message, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      <div className="h-12 w-12 rounded-full bg-ink-100 text-ink-400 flex items-center justify-center mb-4">
        <Icon size={22} />
      </div>
      <p className="text-sm font-medium text-ink-700">{title}</p>
      {message && <p className="text-sm text-ink-400 mt-1 max-w-sm">{message}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
