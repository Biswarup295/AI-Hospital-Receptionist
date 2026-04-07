from uuid import uuid4

from app.core.config import get_settings
from app.schemas.patient import PatientRecord, PatientSubmissionRequest
from app.services.supabase_service import supabase_service
from app.utils.time import utc_now


class PatientService:
    def __init__(self) -> None:
        self.settings = get_settings()
        self._memory_records: list[PatientRecord] = []

    def save_submission(self, payload: PatientSubmissionRequest) -> tuple[PatientRecord, str]:
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
                return supabase_service.insert_patient(record), "supabase"
            except Exception:
                if not self.settings.use_memory_store:
                    raise

        self._memory_records.insert(0, record)
        return record, "memory"

    def list_records(self) -> list[PatientRecord]:
        if supabase_service.enabled:
            try:
                remote_records = supabase_service.list_patients()
                if remote_records:
                    return remote_records
            except Exception:
                if not self.settings.use_memory_store:
                    raise

        return list(self._memory_records)


patient_service = PatientService()

