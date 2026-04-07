from fastapi import APIRouter

from app.core.config import get_settings
from app.services.supabase_service import supabase_service

router = APIRouter()


@router.get("/health")
def health_check() -> dict[str, object]:
    settings = get_settings()
    return {
        "status": "ok",
        "app_name": settings.app_name,
        "supabase_enabled": supabase_service.enabled,
        "webhook_configured": bool(settings.webhook_url),
        "memory_store_enabled": settings.use_memory_store,
    }

