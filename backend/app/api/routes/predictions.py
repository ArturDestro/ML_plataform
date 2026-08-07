from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.prediction_service import predict, list_predictions
from app.schemas.prediction import PredictRequest, PredictionResponse

router = APIRouter()


@router.post("/", response_model=PredictionResponse)
def create_prediction(request: PredictRequest, db: Session = Depends(get_db)):
    try:
        return predict(
            model_id=request.model_id,
            input_data=request.input_data,
            db=db,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/", response_model=list[PredictionResponse])
def get_predictions(db: Session = Depends(get_db)):
    return list_predictions(db)