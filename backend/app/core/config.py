from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "AI Hospital Receptionist API"
    api_prefix: str = "/api"
    allowed_origins: str = "http://localhost:5173,http://127.0.0.1:5173"
    supabase_url: str | None = None
    supabase_key: str | None = None
    supabase_table: str = "patient_intakes"
    webhook_url: str | None = None
    webhook_timeout_seconds: float = 5.0
    use_memory_store: bool = True

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()

