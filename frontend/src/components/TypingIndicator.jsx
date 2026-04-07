export default function TypingIndicator() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
      <span className="h-2 w-2 animate-pulse rounded-full bg-brand-400" />
      <span className="h-2 w-2 animate-pulse rounded-full bg-brand-500 [animation-delay:150ms]" />
      <span className="h-2 w-2 animate-pulse rounded-full bg-brand-600 [animation-delay:300ms]" />
      Intake assistant is typing
    </div>
  );
}

