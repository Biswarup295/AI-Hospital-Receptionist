from uuid import uuid4

from app.core.config import get_settings
from app.schemas.patient import PatientRecord, PatientSubmissionRequest
from app.services.supabase_service import supabase_service
from app.utils.time import utc_now


class PersistenceError(RuntimeError):
    """Raised when patient data cannot be persisted in the configured store."""


class PatientService:
    def __init__(self) -> None:
        self.settings = get_settings()
        self._memory_records: list[PatientRecord] = []

    def save_submission(self, payload: PatientSubmissionRequest) -> tuple[PatientRecord, str, str | None]:
        record = PatientRecord(
            id=uuid4().hex,
            patient_name=payload.patient_name,
            patient_age=payload.patient_age,
            patient_query=payload.patient_query,
            ward=payload.ward,
            timestamp=utc_now(),
        )

        if supabase_service.enabled:
            try:
                return supabase_service.insert_patient(record), "supabase", None
            except Exception as exc:
                if self.settings.use_memory_store and self.settings.fallback_to_memory_on_supabase_error:
                    error_message = f"Supabase insert failed: {exc}"
                    self._memory_records.insert(0, record)
                    return record, "memory", error_message
                raise PersistenceError(f"Supabase insert failed: {exc}") from exc

        if not self.settings.use_memory_store:
            raise PersistenceError(
                "Supabase is not configured and the memory store is disabled. "
                "Set SUPABASE_URL and SUPABASE_KEY for deployed persistence."
            )

        self._memory_records.insert(0, record)
        return record, "memory", None

    def list_records(self) -> list[PatientRecord]:
        if supabase_service.enabled:
            try:
                return supabase_service.list_patients()
            except Exception as exc:
                if self.settings.use_memory_store and self.settings.fallback_to_memory_on_supabase_error:
                    return list(self._memory_records)
                raise PersistenceError(f"Supabase read failed: {exc}") from exc

        if not self.settings.use_memory_store:
            raise PersistenceError(
                "Supabase is not configured and the memory store is disabled. "
                "Set SUPABASE_URL and SUPABASE_KEY for deployed persistence."
            )

        return list(self._memory_records)


patient_service = PatientService()
