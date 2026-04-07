import WardBadge from "./WardBadge";

function SummaryRow({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/80 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-sm font-medium text-ink-950">{value || "Pending"}</p>
    </div>
  );
}

export default function PatientSummaryCard({ patientState }) {
  return (
    <section className="glass-panel p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Patient summary</p>
          <h2 className="mt-2 font-['Space_Grotesk'] text-2xl font-bold text-ink-950">
            Structured intake card
          </h2>
        </div>
        <WardBadge ward={patientState.ward} />
      </div>

      <div className="mt-6 grid gap-3">
        <SummaryRow label="Patient name" value={patientState.patient_name} />
        <SummaryRow
          label="Patient age"
          value={patientState.patient_age ? `${patientState.patient_age} years` : null}
        />
        <SummaryRow label="Primary issue" value={patientState.patient_query} />
        <SummaryRow label="Current step" value={patientState.current_step} />
      </div>
    </section>
  );
}

