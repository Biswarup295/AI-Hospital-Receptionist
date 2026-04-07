const trackerSteps = [
  { key: "patient_query", label: "Symptoms received" },
  { key: "patient_name", label: "Identity captured" },
  { key: "patient_age", label: "Age confirmed" },
  { key: "is_complete", label: "Ready to submit" },
];

export default function StatusTracker({ patientState }) {
  function isComplete(stepKey) {
    if (stepKey === "is_complete") {
      return patientState.is_complete;
    }

    return Boolean(patientState[stepKey]);
  }

  return (
    <section className="glass-panel p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Status tracker</p>
      <div className="mt-5 space-y-3">
        {trackerSteps.map((step, index) => {
          const complete = isComplete(step.key);
          return (
            <div
              key={step.key}
              className={`flex items-center gap-4 rounded-2xl px-4 py-3 ${
                complete ? "bg-brand-50" : "bg-white/80"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-bold ${
                  complete ? "bg-brand-600 text-white" : "bg-slate-200 text-slate-500"
                }`}
              >
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-ink-950">{step.label}</p>
                <p className="text-sm text-slate-500">
                  {complete ? "Completed" : "Waiting"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

