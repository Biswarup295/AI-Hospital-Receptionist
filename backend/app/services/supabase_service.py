import logging

from app.core.config import get_settings
from app.schemas.patient import PatientRecord
from supabase import Client, create_client

logger = logging.getLogger(__name__)


class SupabaseService:
    def __init__(self) -> None:
        self.settings = get_settings()
        self._client: Client | None = None
        self._last_error: str | None = None

        if self.settings.supabase_url and self.settings.supabase_key:
            self._client = create_client(self.settings.supabase_url, self.settings.supabase_key)

    @property
    def enabled(self) -> bool:
        return self._client is not None

    @property
    def last_error(self) -> str | None:
        return self._last_error

    def insert_patient(self, record: PatientRecord) -> PatientRecord:
        if not self._client:
            raise RuntimeError("Supabase is not configured.")

        payload = record.model_dump(mode="json")
        try:
            response = self._client.table(self.settings.supabase_table).insert(payload).execute()
        except Exception as exc:
            self._last_error = str(exc)
            logger.exception("Supabase insert failed for table '%s'.", self.settings.supabase_table)
            raise

        self._last_error = None
        data = response.data[0] if response.data else payload
        return PatientRecord(**data)

    def list_patients(self) -> list[PatientRecord]:
        if not self._client:
            return []

        try:
            response = (
                self._client.table(self.settings.supabase_table)
                .select("*")
                .order("timestamp", desc=True)
                .execute()
            )
        except Exception as exc:
            self._last_error = str(exc)
            logger.exception("Supabase read failed for table '%s'.", self.settings.supabase_table)
            raise

        self._last_error = None
        return [PatientRecord(**item) for item in response.data or []]


supabase_service = SupabaseService()
