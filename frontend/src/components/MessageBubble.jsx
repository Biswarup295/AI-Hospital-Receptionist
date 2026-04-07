export default function MessageBubble({ role, content, timestamp }) {
  const isAssistant = role === "assistant";

  return (
    <div className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[85%] rounded-[24px] px-4 py-3 shadow-sm sm:max-w-[75%] ${
          isAssistant
            ? "rounded-bl-md bg-white text-slate-700"
            : "rounded-br-md bg-brand-600 text-white"
        }`}
      >
        <p className="whitespace-pre-wrap text-sm leading-6">{content}</p>
        <p
          className={`mt-2 text-[11px] ${
            isAssistant ? "text-slate-400" : "text-brand-100"
          }`}
        >
          {new Date(timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

