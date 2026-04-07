import { useState } from "react";

export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question} className="glass-panel overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-['Space_Grotesk'] text-lg font-bold text-ink-950">
                {item.question}
              </span>
              <span className="text-2xl text-brand-600">{isOpen ? "-" : "+"}</span>
            </button>
            {isOpen ? (
              <div className="border-t border-slate-200 px-6 py-5 text-slate-600">
                {item.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

