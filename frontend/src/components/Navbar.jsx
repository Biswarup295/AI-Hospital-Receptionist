import { Link, useLocation } from "react-router-dom";

const marketingLinks = [
  { label: "Features", href: "/#features" },
  { label: "Workflow", href: "/#workflow" },
  { label: "Architecture", href: "/#architecture" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-white/50 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-sm font-bold text-white shadow-float">
            AI
          </div>
          <div>
            <p className="font-['Space_Grotesk'] text-lg font-bold text-ink-950">
              Hospital Receptionist
            </p>
            <p className="text-sm text-slate-500">IBM SkillsBuild demo project</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {marketingLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-brand-700"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              location.pathname === "/dashboard"
                ? "bg-brand-100 text-brand-700"
                : "text-slate-600 hover:bg-white"
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/intake"
            className="rounded-full bg-ink-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Launch Intake
          </Link>
        </div>
      </div>
    </header>
  );
}

