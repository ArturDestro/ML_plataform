from datetime import datetime

from pydantic import BaseModel


class TrainRequest(BaseModel):
    dataset_id: int
    name: str
    algorithm: str
    target_column: str


class ModelResponse(BaseModel):
    id: int
    dataset_id: int
    name: str
    algorithm: str
    target_column: str
    feature_columns: str
    accuracy: float
    precision: float
    recall: float
    f1_score: float
    created_at: datetime

    class Config:
        from_attributes = True