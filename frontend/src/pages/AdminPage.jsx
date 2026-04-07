import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { hospitalApi } from "../services/api";

export default function AdminPage() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRecords() {
      try {
        const response = await hospitalApi.fetchPatients();
        setRecords(response.items || []);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadRecords();
  }, []);

  return (
    <div className="dashboard-shell min-h-screen">
      <Navbar />
      <main className="section-shell pt-10">
        <div className="mb-8">
          <span className="section-kicker">Admin dashboard</span>
          <h1 className="mt-5 font-['Space_Grotesk'] text-4xl font-bold text-ink-950">
            Patient intake records
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-600">
            A read-only dashboard for faculty demos, admin review, and quick validation of
            saved patient submissions.
          </p>
        </div>

        <section className="glass-panel overflow-hidden">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-ink-950">
              Saved records
            </h2>
          </div>

          {isLoading ? (
            <div className="px-6 py-10 text-slate-500">Loading patient records...</div>
          ) : null}

          {error ? <div className="px-6 py-10 text-rose-600">{error}</div> : null}

          {!isLoading && !error ? (
            records.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Age
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Issue
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Ward
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Timestamp
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {records.map((record) => (
                      <tr key={record.id || `${record.patient_name}-${record.timestamp}`}>
                        <td className="px-6 py-4 text-sm font-medium text-ink-950">
                          {record.patient_name}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {record.patient_age}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {record.patient_query}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{record.ward}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {new Date(record.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-6 py-10 text-slate-500">
                No patient records available yet. Submit an intake from the chat page to
                populate this table.
              </div>
            )
          ) : null}
        </section>
      </main>
    </div>
  );
}
