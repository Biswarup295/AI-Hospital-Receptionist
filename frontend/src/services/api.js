const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || "Something went wrong while contacting the backend.");
  }

  return data;
}

export const hospitalApi = {
  sendChatMessage: (payload) =>
    request("/chat", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  submitPatientIntake: (payload) =>
    request("/submit", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  fetchPatients: () => request("/patients"),
  getHealth: () => request("/health"),
};

