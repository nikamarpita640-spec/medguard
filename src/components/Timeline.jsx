export default function Timeline({ items }) {
  return (
    <ol className="relative border-l border-ink-200 ml-2">
      {items.map((item, idx) => (
        <li key={idx} className="mb-5 ml-5 last:mb-0">
          <span className="absolute -left-[7px] flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand-500 ring-4 ring-white" />
          <div className="flex flex-wrap items-baseline gap-x-2">
            <time className="text-xs font-semibold text-ink-500">{item.time}</time>
          </div>
          <p className="text-sm text-ink-700 mt-0.5">{item.event}</p>
        </li>
      ))}
    </ol>
  );
}
