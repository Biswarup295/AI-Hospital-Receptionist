from fastapi import APIRouter

from app.schemas.chat import ChatRequest, ChatResponse
from app.services.intake_service import intake_service

router = APIRouter()


@router.post("", response_model=ChatResponse)
def chat(payload: ChatRequest) -> ChatResponse:
    return intake_service.process_message(
        message=payload.message,
        session_id=payload.session_id,
    )

