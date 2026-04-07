import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

export default function ChatBox({
  messages,
  onSendMessage,
  isTyping,
  error,
  suggestions = [],
}) {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const endRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceSupported(false);
      return undefined;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      setInput((current) => `${current} ${transcript}`.trim());
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
    setVoiceSupported(true);

    return () => recognition.stop();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (!input.trim()) {
      return;
    }

    onSendMessage(input);
    setInput("");
  }

  function handleVoiceToggle() {
    if (!recognitionRef.current) {
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    setIsListening(true);
    recognitionRef.current.start();
  }

  return (
    <section className="glass-panel flex min-h-[720px] flex-col p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Live intake console</p>
          <h2 className="mt-1 font-['Space_Grotesk'] text-2xl font-bold text-ink-950">
            Patient conversation
          </h2>
        </div>
        <div className="rounded-full bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
          Real-time summary sync
        </div>
      </div>

      <div className="mt-4 flex-1 space-y-4 overflow-y-auto rounded-[24px] bg-slate-50/80 p-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}
        {isTyping ? <TypingIndicator /> : null}
        <div ref={endRef} />
      </div>

      {suggestions.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setInput(suggestion)}
              className="rounded-full border border-brand-100 bg-white px-3 py-2 text-sm text-slate-600 transition hover:border-brand-400"
            >
              {suggestion}
            </button>
          ))}
        </div>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</p>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex flex-col gap-3 rounded-[28px] border border-slate-200 bg-white p-3 shadow-sm sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="chat-input" className="sr-only">
              Patient message
            </label>
            <textarea
              id="chat-input"
              rows="3"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  handleSubmit(event);
                }
              }}
              placeholder="Describe symptoms, share identity details, or continue the intake..."
              className="w-full resize-none border-0 bg-transparent px-2 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleVoiceToggle}
              disabled={!voiceSupported}
              className={`rounded-full px-4 py-3 text-sm font-semibold transition ${
                voiceSupported
                  ? isListening
                    ? "bg-brand-100 text-brand-700"
                    : "bg-slate-100 text-slate-600 hover:bg-brand-50"
                  : "cursor-not-allowed bg-slate-100 text-slate-400"
              }`}
            >
              {isListening ? "Listening" : "Voice"}
            </button>
            <button
              type="submit"
              className="rounded-full bg-ink-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

