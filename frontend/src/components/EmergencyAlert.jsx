export default function EmergencyAlert() {
  return (
    <section className="rounded-[28px] border border-rose-200 bg-rose-50 p-5 shadow-sm">
      <p className="text-sm uppercase tracking-[0.25em] text-rose-500">Priority alert</p>
      <h3 className="mt-2 font-['Space_Grotesk'] text-xl font-bold text-rose-700">
        Emergency signals detected
      </h3>
      <p className="mt-2 text-sm leading-6 text-rose-600">
        The intake workflow has identified symptoms that may need immediate medical
        attention. Continue the chat to finish the minimum required details quickly.
      </p>
    </section>
  );
}

