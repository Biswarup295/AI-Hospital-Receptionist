from app.core.config import get_settings
from app.schemas.patient import PatientRecord
from supabase import Client, create_client


class SupabaseService:
    def __init__(self) -> None:
        self.settings = get_settings()
        self._client: Client | None = None

        if self.settings.supabase_url and self.settings.supabase_key:
            self._client = create_client(self.settings.supabase_url, self.settings.supabase_key)

    @property
    def enabled(self) -> bool:
        return self._client is not None

    def insert_patient(self, record: PatientRecord) -> PatientRecord:
        if not self._client:
            raise RuntimeError("Supabase is not configured.")

        payload = record.model_dump(mode="json")
        response = self._client.table(self.settings.supabase_table).insert(payload).execute()
        data = response.data[0] if response.data else payload
        return PatientRecord(**data)

    def list_patients(self) -> list[PatientRecord]:
        if not self._client:
            return []

        response = (
            self._client.table(self.settings.supabase_table)
            .select("*")
            .order("timestamp", desc=True)
            .execute()
        )
        return [PatientRecord(**item) for item in response.data or []]


supabase_service = SupabaseService()

