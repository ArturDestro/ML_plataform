import os
import uuid

import pandas as pd
from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.dataset import Dataset 

STORAGE_DIR = 'storage/datasets'

def save_dataset(file: UploadFile, db: Session) -> Dataset:
    os.makedirs(STORAGE_DIR, exist_ok=True)

    unique_name = f"{uuid.uuid4().hex}_{file.filename}"
    file_path = os.path.join(STORAGE_DIR, unique_name)

    with open(file_path, 'wb') as buffer:
        buffer.write(file.file.read())

    df = pd.read_csv(file_path)

    dataset = Dataset(
        name=file.filename,
        file_path=file_path,
        columns=",".join(df.columns.to_list()),
        num_rows=len(df),
        num_columns=len(df.columns),
    )

    db.add(dataset)
    db.commit()
    db.refresh(dataset)

    return dataset

def list_dataset(db: Session) -> list[Dataset]:
    return db.query(Dataset).order_by(Dataset.uploaded_at.desc()).all()