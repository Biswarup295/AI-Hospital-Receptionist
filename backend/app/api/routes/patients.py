from fastapi import APIRouter, HTTPException

from app.schemas.patient import PatientsResponse
from app.services.patient_service import PersistenceError, patient_service

router = APIRouter()


@router.get("", response_model=PatientsResponse)
def list_patients() -> PatientsResponse:
    try:
        return PatientsResponse(items=patient_service.list_records())
    except PersistenceError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
