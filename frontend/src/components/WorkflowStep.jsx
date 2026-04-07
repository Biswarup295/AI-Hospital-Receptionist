export default function WorkflowStep({ index, title, description }) {
  return (
    <div className="relative rounded-[28px] border border-brand-100 bg-white/80 p-6 shadow-glass">
      <div className="absolute -top-4 left-6 flex h-10 w-10 items-center justify-center rounded-2xl bg-ink-950 text-sm font-bold text-white">
        {index}
      </div>
      <h3 className="mt-6 font-['Space_Grotesk'] text-xl font-bold text-ink-950">{title}</h3>
      <p className="mt-3 text-slate-600">{description}</p>
    </div>
  );
}

