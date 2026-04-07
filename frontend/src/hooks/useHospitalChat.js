import { useState } from "react";
import { hospitalApi } from "../services/api";

const initialPatientState = {
  session_id: null,
  patient_name: null,
  patient_age: null,
  patient_query: null,
  ward: "Unassigned",
  current_step: "collecting_query",
  is_complete: false,
  is_urgent: false,
  missing_fields: ["patient_name", "patient_age", "patient_query"],
  last_bot_reply: null,
};

function createMessage(role, content) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    timestamp: new Date().toISOString(),
  };
}

export function useHospitalChat() {
  const [messages, setMessages] = useState([
    createMessage(
      "assistant",
      "Welcome to the AI Hospital Receptionist. Please tell me what brings you in today, and I will guide your intake one step at a time.",
    ),
  ]);
  const [patientState, setPatientState] = useState(initialPatientState);
  const [sessionId, setSessionId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");
  const [submitResult, setSubmitResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function sendMessage(content) {
    const message = content.trim();

    if (!message) {
      return;
    }

    setError("");
    setSubmitResult(null);
    setMessages((current) => [...current, createMessage("user", message)]);
    setIsTyping(true);

    try {
      const response = await hospitalApi.sendChatMessage({
        message,
        session_id: sessionId,
      });

      setSessionId(response.session_id);
      setPatientState(response.patient_state);
      setMessages((current) => [...current, createMessage("assistant", response.reply)]);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsTyping(false);
    }
  }

  async function submitIntake() {
    if (!patientState.is_complete) {
      setError("The intake is not complete yet. Please provide the missing details first.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await hospitalApi.submitPatientIntake({
        session_id: sessionId,
        patient_name: patientState.patient_name,
        patient_age: patientState.patient_age,
        patient_query: patientState.patient_query,
        ward: patientState.ward,
      });

      setSubmitResult(response);
      setMessages((current) => [
        ...current,
        createMessage("assistant", response.message),
      ]);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetConversation() {
    setMessages([
      createMessage(
        "assistant",
        "The intake has been reset. Please share the patient's symptoms whenever you are ready.",
      ),
    ]);
    setPatientState(initialPatientState);
    setSessionId(null);
    setError("");
    setSubmitResult(null);
    setIsTyping(false);
    setIsSubmitting(false);
  }

  return {
    messages,
    patientState,
    isTyping,
    error,
    submitResult,
    isSubmitting,
    sendMessage,
    submitIntake,
    resetConversation,
  };
}

