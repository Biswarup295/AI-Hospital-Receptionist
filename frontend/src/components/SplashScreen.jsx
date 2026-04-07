import { useEffect } from "react";

export default function SplashScreen({ onDone }) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 1800);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[radial-gradient(circle_at_top,#d7f8ff,#f6fcff_55%,#f0f7ff)]">
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 animate-float items-center justify-center rounded-[28px] bg-ink-950 text-2xl font-bold text-white shadow-float">
          AI
        </div>
        <p className="mt-6 section-kicker">IBM SkillsBuild project</p>
        <h1 className="mt-4 font-['Space_Grotesk'] text-4xl font-bold text-ink-950">
          AI Hospital Receptionist
        </h1>
        <p className="mt-3 text-slate-500">Preparing the intake command center...</p>
      </div>
    </div>
  );
}
