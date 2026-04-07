const badgeStyles = {
  "General Ward": "bg-brand-100 text-brand-700",
  "Emergency Ward": "bg-rose-100 text-rose-700",
  "Mental Health Ward": "bg-violet-100 text-violet-700",
  Unassigned: "bg-slate-200 text-slate-600",
};

export default function WardBadge({ ward }) {
  const resolvedWard = ward || "Unassigned";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-2 text-sm font-semibold ${
        badgeStyles[resolvedWard] || badgeStyles.Unassigned
      }`}
    >
      {resolvedWard}
    </span>
  );
}

