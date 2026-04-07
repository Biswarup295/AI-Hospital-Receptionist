export default function Footer() {
  return (
    <footer className="section-shell pt-6">
      <div className="glass-panel flex flex-col items-start justify-between gap-6 p-6 md:flex-row md:items-center">
        <div>
          <p className="font-['Space_Grotesk'] text-2xl font-bold text-ink-950">
            AI Hospital Receptionist
          </p>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Built for IBM SkillsBuild as a futuristic full-stack intake assistant with
            React, FastAPI, LangGraph, and Supabase.
          </p>
        </div>
        <div className="text-sm text-slate-500">
          <p>Demo-ready healthcare AI workflow</p>
          <p className="mt-1">Presentation-ready UI and backend orchestration</p>
        </div>
      </div>
    </footer>
  );
}

