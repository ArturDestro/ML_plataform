from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.training_service import train_model, list_models
from app.schemas.model import TrainRequest, ModelResponse

router = APIRouter()


@router.post("/", response_model=ModelResponse)
def create_model(request: TrainRequest, db: Session = Depends(get_db)):
    try:
        return train_model(
            dataset_id=request.dataset_id,
            name=request.name,
            algorithm=request.algorithm,
            target_column=request.target_column,
            db=db,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/", response_model=list[ModelResponse])
def get_models(db: Session = Depends(get_db)):
    return list_models(db)