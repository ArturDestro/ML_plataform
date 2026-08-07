from datetime import datetime

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey

from app.core.database import Base


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    model_id = Column(Integer, ForeignKey("models.id"), nullable=False)
    input_data = Column(String, nullable=False)
    result = Column(String, nullable=False)
    probability = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)