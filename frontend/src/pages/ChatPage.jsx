import Navbar from "../components/Navbar";
import ChatBox from "../components/ChatBox";
import PatientSummaryCard from "../components/PatientSummaryCard";
import StatusTracker from "../components/StatusTracker";
import EmergencyAlert from "../components/EmergencyAlert";
import WardBadge from "../components/WardBadge";
import { useHospitalChat } from "../hooks/useHospitalChat";

const suggestions = [
  "I have fever and body pain.",
  "My name is Rahul.",
  "I am 24 years old.",
  "I have been feeling anxious and stressed.",
];

export default function ChatPage() {
  const {
    messages,
    patientState,
    isTyping,
    error,
    submitResult,
    isSubmitting,
    sendMessage,
    submitIntake,
    resetConversation,
  } = useHospitalChat();

  return (
    <div className="dashboard-shell min-h-screen">
      <Navbar />
      <main className="section-shell pt-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="section-kicker">Patient intake workspace</span>
            <h1 className="mt-5 font-['Space_Grotesk'] text-4xl font-bold text-ink-950">
              Live triage and summary dashboard
            </h1>
            <p className="mt-3 max-w-3xl text-lg text-slate-600">
              Talk to the intake assistant as a patient would. The summary card, ward
              badge, and status tracker update from backend responses in real time.
            </p>
          </div>
          <WardBadge ward={patientState.ward} />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <ChatBox
            messages={messages}
            onSendMessage={sendMessage}
            isTyping={isTyping}
            error={error}
            suggestions={suggestions}
          />

          <div className="space-y-6">
            {patientState.is_urgent ? <EmergencyAlert /> : null}
            <PatientSummaryCard patientState={patientState} />
            <StatusTracker patientState={patientState} />

            <section className="glass-panel p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Submission</p>
              <h2 className="mt-2 font-['Space_Grotesk'] text-2xl font-bold text-ink-950">
                Finalize patient intake
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                When all required details are present, submit the intake to save the
                record and trigger the configured webhook.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={submitIntake}
                  disabled={!patientState.is_complete || isSubmitting}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                    patientState.is_complete && !isSubmitting
                      ? "bg-ink-950 text-white hover:bg-brand-700"
                      : "cursor-not-allowed bg-slate-200 text-slate-500"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit intake"}
                </button>
                <button
                  type="button"
                  onClick={resetConversation}
                  className="rounded-full border border-brand-200 bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition hover:border-brand-400"
                >
                  Reset chat
                </button>
              </div>

              {submitResult ? (
                <div className="mt-5 rounded-[24px] bg-brand-50 p-4 text-sm text-slate-700">
                  <p className="font-semibold text-brand-700">{submitResult.message}</p>
                  <p className="mt-2">Storage mode: {submitResult.storage_mode}</p>
                  <p className="mt-1">Webhook status: {submitResult.webhook_status}</p>
                </div>
              ) : null}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

