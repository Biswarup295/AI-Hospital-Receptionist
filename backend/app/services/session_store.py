from app.schemas.patient import PatientState


class SessionStore:
    def __init__(self) -> None:
        self._store: dict[str, PatientState] = {}

    def get(self, session_id: str) -> PatientState | None:
        return self._store.get(session_id)

    def set(self, session_id: str, state: PatientState) -> None:
        self._store[session_id] = state

    def clear(self, session_id: str) -> None:
        self._store.pop(session_id, None)

