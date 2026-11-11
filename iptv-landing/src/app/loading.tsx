export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="grid min-h-[75vh] place-items-center bg-obsidian"
    >
      <span className="sr-only">Loading page…</span>
      <span
        aria-hidden="true"
        className="h-8 w-8 animate-spin rounded-full border border-gold/25 border-t-gold"
      />
    </div>
  );
}
