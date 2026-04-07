export default function FeatureCard({ icon, title, description }) {
  return (
    <article className="glass-panel h-full p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 font-['Space_Grotesk'] text-sm font-bold text-brand-700">
        {icon}
      </div>
      <h3 className="mt-5 font-['Space_Grotesk'] text-2xl font-bold text-ink-950">{title}</h3>
      <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
    </article>
  );
}

