from typing import TypedDict


class IntakeGraphState(TypedDict, total=False):
    session_id: str
    user_message: str
    patient_name: str | None
    patient_age: int | None
    patient_query: str | None
    ward: str
    current_step: str
    is_complete: bool
    is_urgent: bool
    missing_fields: list[str]
    reply: str

