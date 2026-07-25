const DEADLINE = new Date("2026-08-02T00:00:00+02:00").getTime();

export function daysLeft(): number {
  return Math.max(0, Math.ceil((DEADLINE - Date.now()) / 86_400_000));
}

/** Live "N days left" chip for Article 50 urgency. */
export default function Countdown({ className = "" }: { className?: string }) {
  const d = daysLeft();
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-[#fecaca] bg-[#fef2f2] px-3 py-1 text-xs font-bold text-[#991b1b] ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#dc2626] opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#dc2626]" />
      </span>
      {d === 0 ? "Article 50 is live now" : `${d} day${d === 1 ? "" : "s"} until Article 50 is live`}
    </span>
  );
}
