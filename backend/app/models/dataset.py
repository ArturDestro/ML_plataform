from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime
from app.core.database import Base

class Dataset(Base):
    __tablename__ = 'datasets'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    columns = Column(String, nullable=False)
    num_rows = Column(Integer, nullable=False)
    num_columns = Column(Integer, nullable=False)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
