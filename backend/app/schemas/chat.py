from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.schemas.patient import PatientState


class ChatRequest(BaseModel):
    session_id: str | None = None
    message: str = Field(..., min_length=1, max_length=500)

    @field_validator("message")
    @classmethod
    def strip_message(cls, value: str) -> str:
        normalized = value.strip()
        if not normalized:
            raise ValueError("Message cannot be empty.")
        return normalized


class ChatResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    session_id: str
    reply: str
    ward: str
    next_action: str
    patient_state: PatientState
