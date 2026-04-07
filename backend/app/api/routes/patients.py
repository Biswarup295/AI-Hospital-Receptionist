from fastapi import APIRouter

from app.schemas.patient import PatientsResponse
from app.services.patient_service import patient_service

router = APIRouter()


@router.get("", response_model=PatientsResponse)
def list_patients() -> PatientsResponse:
    return PatientsResponse(items=patient_service.list_records())

