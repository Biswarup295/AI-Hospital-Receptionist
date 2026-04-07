export default function WardCard({ title, tone, symptoms }) {
  return (
    <div className="glass-panel h-full p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-ink-950">{title}</h3>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
          {tone}
        </span>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {symptoms.map((symptom) => (
          <span
            key={symptom}
            className="rounded-full border border-brand-100 bg-white px-3 py-2 text-sm text-slate-600"
          >
            {symptom}
          </span>
        ))}
      </div>
    </div>
  );
}
