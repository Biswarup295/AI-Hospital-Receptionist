from uuid import uuid4

from app.schemas.chat import ChatResponse
from app.schemas.patient import PatientState
from app.services.session_store import SessionStore
from app.workflow.graph import build_intake_graph


class IntakeService:
    def __init__(self) -> None:
        self._graph = build_intake_graph()
        self._session_store = SessionStore()

    def process_message(self, message: str, session_id: str | None = None) -> ChatResponse:
        resolved_session_id = session_id or uuid4().hex
        previous_state = self._session_store.get(resolved_session_id)

        graph_input = {
            "session_id": resolved_session_id,
            "user_message": message,
            "patient_name": previous_state.patient_name if previous_state else None,
            "patient_age": previous_state.patient_age if previous_state else None,
            "patient_query": previous_state.patient_query if previous_state else None,
            "ward": previous_state.ward if previous_state else "Unassigned",
            "current_step": previous_state.current_step if previous_state else "collecting_query",
            "is_complete": previous_state.is_complete if previous_state else False,
            "is_urgent": previous_state.is_urgent if previous_state else False,
            "missing_fields": previous_state.missing_fields if previous_state else [],
            "reply": previous_state.last_bot_reply if previous_state else "",
        }

        result = self._graph.invoke(graph_input)

        patient_state = PatientState(
            session_id=resolved_session_id,
            patient_name=result.get("patient_name"),
            patient_age=result.get("patient_age"),
            patient_query=result.get("patient_query"),
            ward=result.get("ward", "Unassigned"),
            current_step=result.get("current_step", "collecting_query"),
            is_complete=result.get("is_complete", False),
            is_urgent=result.get("is_urgent", False),
            missing_fields=result.get("missing_fields", []),
            last_bot_reply=result.get("reply"),
        )

        self._session_store.set(resolved_session_id, patient_state)

        return ChatResponse(
            session_id=resolved_session_id,
            reply=patient_state.last_bot_reply or "Please continue the intake.",
            ward=patient_state.ward,
            next_action="submit" if patient_state.is_complete else "continue",
            patient_state=patient_state,
        )

    def get_session_state(self, session_id: str) -> PatientState | None:
        return self._session_store.get(session_id)

    def clear_session(self, session_id: str) -> None:
        self._session_store.clear(session_id)


intake_service = IntakeService()

