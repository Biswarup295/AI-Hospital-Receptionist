import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="section-shell pt-14">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-rise">
          <span className="section-kicker">AI-powered hospital intake</span>
          <h1 className="mt-6 max-w-4xl font-['Space_Grotesk'] text-5xl font-bold leading-tight text-ink-950 sm:text-6xl">
            A premium <span className="title-gradient">AI receptionist</span> that triages,
            clarifies, and prepares patient handoff in minutes.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Built for IBM SkillsBuild demos, this full-stack project combines a
            futuristic healthcare UI with FastAPI, LangGraph, Supabase, and webhook
            automation.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/intake"
              className="rounded-full bg-ink-950 px-6 py-3 text-center text-sm font-semibold text-white shadow-float transition hover:bg-brand-700"
            >
              Try the live chat
            </Link>
            <a
              href="#architecture"
              className="rounded-full border border-brand-200 bg-white/70 px-6 py-3 text-center text-sm font-semibold text-brand-700 transition hover:border-brand-400"
            >
              View architecture
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 top-16 h-40 w-40 rounded-full bg-brand-200/60 blur-3xl" />
          <div className="absolute -right-4 top-0 h-32 w-32 rounded-full bg-mint/70 blur-3xl" />
          <div className="glass-panel medical-grid relative overflow-hidden p-6 shadow-float">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-brand-700">
                  Live triage preview
                </p>
                <h3 className="mt-2 font-['Space_Grotesk'] text-2xl font-bold text-ink-950">
                  Reception dashboard
                </h3>
              </div>
              <div className="rounded-full bg-coral px-3 py-1 text-xs font-semibold text-white">
                Emergency aware
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="ml-auto max-w-xs rounded-[22px] rounded-br-md bg-brand-600 px-4 py-3 text-sm text-white">
                I have chest pain and I am feeling short of breath.
              </div>
              <div className="max-w-sm rounded-[22px] rounded-bl-md bg-white px-4 py-3 text-sm text-slate-700 shadow-md">
                I am prioritizing this as urgent. Please share your name so I can complete
                intake quickly.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

