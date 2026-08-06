from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services.dataset_service import save_dataset, list_dataset
from app.schemas.dataset import DatasetResponse

router = APIRouter()


@router.post("/", response_model=DatasetResponse)
def upload_dataset(file: UploadFile = File(...), db: Session = Depends(get_db)):
    return save_dataset(file, db)


@router.get("/", response_model=list[DatasetResponse])
def get_datasets(db: Session = Depends(get_db)):
    return list_dataset(db)