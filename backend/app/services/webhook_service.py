import httpx

from app.core.config import get_settings
from app.schemas.patient import PatientRecord


class WebhookService:
    def __init__(self) -> None:
        self.settings = get_settings()

    async def trigger(self, record: PatientRecord) -> tuple[bool, str]:
        if not self.settings.webhook_url:
            return False, "Webhook skipped because WEBHOOK_URL is not configured."

        payload = record.model_dump(mode="json")

        async with httpx.AsyncClient(timeout=self.settings.webhook_timeout_seconds) as client:
            try:
                response = await client.post(self.settings.webhook_url, json=payload)
                response.raise_for_status()
            except Exception as exc:
                return False, f"Webhook delivery failed: {exc}"

        return True, "Webhook delivered successfully."


webhook_service = WebhookService()

