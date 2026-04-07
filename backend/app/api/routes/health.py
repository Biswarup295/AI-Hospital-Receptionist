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
        "supabase_table": settings.supabase_table,
        "last_supabase_error": supabase_service.last_error,
        "webhook_configured": bool(settings.webhook_url),
        "memory_store_enabled": settings.use_memory_store,
        "fallback_to_memory_on_supabase_error": settings.fallback_to_memory_on_supabase_error,
    }
