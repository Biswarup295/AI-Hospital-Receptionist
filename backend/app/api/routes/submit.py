from fastapi import APIRouter, HTTPException

from app.schemas.patient import PatientSubmissionRequest, PatientSubmissionResponse
from app.services.intake_service import intake_service
from app.services.patient_service import PersistenceError, patient_service
from app.services.webhook_service import webhook_service

router = APIRouter()


@router.post("", response_model=PatientSubmissionResponse)
async def submit_intake(payload: PatientSubmissionRequest) -> PatientSubmissionResponse:
    if payload.ward == "Unassigned":
        raise HTTPException(status_code=400, detail="Ward classification is required before submission.")

    try:
        record, storage_mode, storage_error = patient_service.save_submission(payload)
    except PersistenceError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc

    webhook_triggered, webhook_status = await webhook_service.trigger(record)

    if payload.session_id:
        intake_service.clear_session(payload.session_id)

    return PatientSubmissionResponse(
        success=True,
        message="Patient intake submitted successfully.",
        storage_mode=storage_mode,
        storage_error=storage_error,
        webhook_triggered=webhook_triggered,
        webhook_status=webhook_status,
        record=record,
    )
