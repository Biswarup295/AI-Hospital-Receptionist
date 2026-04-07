from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator

WardName = Literal["General Ward", "Emergency Ward", "Mental Health Ward", "Unassigned"]


class PatientState(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    session_id: str | None = None
    patient_name: str | None = Field(default=None, max_length=80)
    patient_age: int | None = Field(default=None, ge=0, le=120)
    patient_query: str | None = Field(default=None, max_length=500)
    ward: WardName = "Unassigned"
    current_step: str = "collecting_query"
    is_complete: bool = False
    is_urgent: bool = False
    missing_fields: list[str] = Field(default_factory=list)
    last_bot_reply: str | None = None

    @field_validator("patient_name")
    @classmethod
    def normalize_name(cls, value: str | None) -> str | None:
        if value is None:
            return value
        normalized = " ".join(part for part in value.strip().split() if part)
        return normalized or None

    @field_validator("patient_query")
    @classmethod
    def normalize_query(cls, value: str | None) -> str | None:
        if value is None:
            return value
        normalized = value.strip()
        return normalized or None


class PatientSubmissionRequest(BaseModel):
    session_id: str | None = None
    patient_name: str = Field(..., min_length=2, max_length=80)
    patient_age: int = Field(..., ge=0, le=120)
    patient_query: str = Field(..., min_length=3, max_length=500)
    ward: WardName

    @field_validator("patient_name", "patient_query")
    @classmethod
    def normalize_text_fields(cls, value: str) -> str:
        normalized = " ".join(value.strip().split())
        if not normalized:
            raise ValueError("Field cannot be empty.")
        return normalized


class PatientRecord(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str | None = None
    patient_name: str
    patient_age: int
    patient_query: str
    ward: WardName
    timestamp: datetime


class PatientSubmissionResponse(BaseModel):
    success: bool
    message: str
    storage_mode: str
    webhook_triggered: bool
    webhook_status: str
    record: PatientRecord


class PatientsResponse(BaseModel):
    items: list[PatientRecord]
