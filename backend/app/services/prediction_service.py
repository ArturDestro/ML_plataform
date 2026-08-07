import json

from sqlalchemy.orm import Session

from app.models.model import Model
from app.models.prediction import Prediction
from app.ml.predict import predict as run_prediction


def predict(model_id: int, input_data: dict[str, float], db: Session) -> Prediction:
    model = db.query(Model).filter(Model.id == model_id).first()

    if model is None:
        raise ValueError(f"Modelo com id {model_id} não encontrado.")

    feature_columns = model.feature_columns.split(",")

    result = run_prediction(model.file_path, feature_columns, input_data)

    prediction = Prediction(
        model_id=model.id,
        input_data=json.dumps(input_data),
        result=result["result"],
        probability=result["probability"],
    )

    db.add(prediction)
    db.commit()
    db.refresh(prediction)

    return prediction


def list_predictions(db: Session) -> list[Prediction]:
    return db.query(Prediction).order_by(Prediction.created_at.desc()).all()