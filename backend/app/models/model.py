from datetime import datetime

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey

from app.core.database import Base


class Model(Base):
    __tablename__ = "models"

    id = Column(Integer, primary_key=True, index=True)
    dataset_id = Column(Integer, ForeignKey("datasets.id"), nullable=False)
    name = Column(String, nullable=False)
    algorithm = Column(String, nullable=False)
    target_column = Column(String, nullable=False)
    feature_columns = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    accuracy = Column(Float, nullable=False)
    precision = Column(Float, nullable=False)
    recall = Column(Float, nullable=False)
    f1_score = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)