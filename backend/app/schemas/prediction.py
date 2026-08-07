from datetime import datetime
from typing import Any

from pydantic import BaseModel


class PredictRequest(BaseModel):
    model_id: int
    input_data: dict[str, float]


class PredictionResponse(BaseModel):
    id: int
    model_id: int
    input_data: str
    result: str
    probability: float | None
    created_at: datetime

    class Config:
        from_attributes = True