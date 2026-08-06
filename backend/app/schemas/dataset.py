from datetime import datetime

from pydantic import BaseModel


class DatasetResponse(BaseModel):
    id: int
    name: str
    columns: str
    num_rows: int
    num_columns: int
    uploaded_at: datetime

    class Config:
        from_attributes = True