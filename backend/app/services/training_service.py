import pandas as pd
from sqlalchemy.orm import Session

from app.models.dataset import Dataset
from app.models.model import Model
from app.ml.train import train_and_evaluate


def train_model(dataset_id: int, name: str, algorithm: str, target_column: str, db: Session) -> Model:
    dataset = db.query(Dataset).filter(Dataset.id == dataset_id).first()

    if dataset is None:
        raise ValueError(f"Dataset com id {dataset_id} não encontrado.")

    df = pd.read_csv(dataset.file_path)

    result = train_and_evaluate(df, target_column, algorithm)

    model = Model(
        dataset_id=dataset.id,
        name=name,
        algorithm=algorithm,
        target_column=target_column,
        feature_columns=",".join(result["feature_columns"]),
        file_path=result["file_path"],
        accuracy=result["metrics"]["accuracy"],
        precision=result["metrics"]["precision"],
        recall=result["metrics"]["recall"],
        f1_score=result["metrics"]["f1_score"],
    )

    db.add(model)
    db.commit()
    db.refresh(model)

    return model


def list_models(db: Session) -> list[Model]:
    return db.query(Model).order_by(Model.created_at.desc()).all()