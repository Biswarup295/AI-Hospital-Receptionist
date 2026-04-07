import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeatureCard from "../components/FeatureCard";
import WorkflowStep from "../components/WorkflowStep";
import WardCard from "../components/WardCard";
import SectionTitle from "../components/SectionTitle";
import FAQAccordion from "../components/FAQAccordion";
import Footer from "../components/Footer";
import SplashScreen from "../components/SplashScreen";
import {
  architectureLayers,
  benefits,
  faqs,
  featureItems,
  projectHighlights,
  techStack,
  teamContacts,
  wardCards,
  workflowSteps,
} from "../data/content";

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="dashboard-shell">
      {showSplash ? <SplashScreen onDone={() => setShowSplash(false)} /> : null}
      <Navbar />
      <HeroSection />

      <section id="about" className="section-shell pt-8">
        <div className="glass-panel grid gap-8 p-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionTitle
              kicker="About the project"
              title="A hospital intake experience designed for real demo storytelling."
              description="This project simulates how an AI receptionist can collect patient details, detect urgency, classify the right ward, and prepare the case for a reliable digital handoff."
            />
          </div>
          <div className="grid gap-4">
            {projectHighlights.map((highlight) => (
              <div key={highlight} className="rounded-[24px] bg-white/90 p-5">
                <p className="text-sm leading-7 text-slate-600">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="section-shell">
        <SectionTitle
          kicker="Features"
          title="Built to feel polished in front of judges, faculty, and recruiters."
          description="The interface and architecture work together so the project reads as both technically strong and immediately useful."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featureItems.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section id="workflow" className="section-shell">
        <SectionTitle
          kicker="Workflow"
          title="A step-by-step intake flow that stays explainable."
          description="The system keeps the logic transparent so it is easy to walk through during a presentation or viva."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {workflowSteps.map((step, index) => (
            <WorkflowStep key={step.title} index={index + 1} {...step} />
          ))}
        </div>
      </section>

      <section id="wards" className="section-shell">
        <SectionTitle
          kicker="Ward classification"
          title="Clear routing logic for the three supported care pathways."
          description="The intake engine maps symptom patterns to the appropriate ward and escalates emergency wording when required."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {wardCards.map((ward) => (
            <WardCard key={ward.title} {...ward} />
          ))}
        </div>
      </section>

      <section id="demo" className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
          <div className="glass-panel p-8">
            <SectionTitle
              kicker="Live chat demo"
              title="An immersive intake console for real-time patient interaction."
              description="The dedicated chat page keeps the conversation on the left while a synchronized summary, status tracker, and alert system stay visible on the right."
            />
          </div>
          <div className="glass-panel p-8">
            <div className="space-y-4">
              <div className="ml-auto max-w-sm rounded-[24px] rounded-br-md bg-brand-600 px-4 py-3 text-sm text-white">
                My name is Riya. I am 22 and I have been feeling very anxious lately.
              </div>
              <div className="max-w-md rounded-[24px] rounded-bl-md bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
                Thank you, Riya. I have noted a mental health concern. Please confirm if
                you are experiencing panic attacks, stress, or another issue.
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Name</p>
                  <p className="mt-2 font-semibold text-ink-950">Riya</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Ward</p>
                  <p className="mt-2 font-semibold text-violet-700">Mental Health</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Progress</p>
                  <p className="mt-2 font-semibold text-brand-700">Collecting issue</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="section-shell">
        <div className="glass-panel p-8">
          <SectionTitle
            kicker="Benefits"
            title="Why this concept works as both a product idea and a student project."
            description="The system reduces manual intake effort while offering a clean AI narrative with visible frontend, backend, workflow, and data layers."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-[24px] border border-brand-100 bg-white/90 p-5 text-slate-600"
              >
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tech" className="section-shell">
        <SectionTitle
          kicker="Tech stack"
          title="Strictly aligned to the requested full-stack architecture."
          description="Every layer is organized to stay modular, presentation-ready, and scalable for future feature work."
          align="center"
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {techStack.map((item) => (
            <div
              key={item}
              className="rounded-full border border-brand-100 bg-white/85 px-5 py-3 text-sm font-semibold text-ink-950 shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="architecture" className="section-shell">
        <SectionTitle
          kicker="System architecture"
          title="A clean flow from user chat to triage engine to storage and automation."
          description="The project is structured so each layer has a single responsibility and can be explained clearly during development reviews."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {architectureLayers.map((layer) => (
            <div key={layer.title} className="glass-panel p-6">
              <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-ink-950">
                {layer.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">{layer.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="highlights" className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="glass-panel p-8">
            <SectionTitle
              kicker="Project highlights"
              title="Demo-friendly by design."
              description="The build favors predictable logic, graceful fallbacks, and UX clarity so the project remains stable even when external services are not configured."
            />
          </div>
          <div className="grid gap-4">
            {projectHighlights.map((highlight) => (
              <div key={highlight} className="glass-panel p-5 text-slate-600">
                {highlight}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="section-shell">
        <SectionTitle
          kicker="FAQ"
          title="Short answers for the most common project questions."
          description="These talking points are useful for presentations, viva sessions, and technical walkthroughs."
          align="center"
        />
        <div className="mx-auto mt-12 max-w-4xl">
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <section id="contact" className="section-shell">
        <div className="glass-panel grid gap-8 p-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionTitle
              kicker="Team and contact"
              title="Ready to present, extend, and deploy."
              description="Use this space to introduce your team members, submission links, or project ownership details before demo day."
            />
          </div>
          <div className="grid gap-4">
            {teamContacts.map((item) => (
              <div key={item.label} className="rounded-[24px] bg-white/90 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
                <p className="mt-2 font-medium text-ink-950">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

