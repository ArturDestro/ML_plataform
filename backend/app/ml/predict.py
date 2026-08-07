import joblib
import pandas as pd


def predict(file_path: str, feature_columns: list[str], input_data: dict[str, float]):
    missing = [col for col in feature_columns if col not in input_data]
    if missing:
        raise ValueError(f"Faltam os campos: {missing}")

    extra = [col for col in input_data if col not in feature_columns]
    if extra:
        raise ValueError(f"Campos não esperados pelo modelo: {extra}")

    model = joblib.load(file_path)

    ordered_values = [[input_data[col] for col in feature_columns]]
    df = pd.DataFrame(ordered_values, columns=feature_columns)

    prediction = model.predict(df)[0]

    probability = None
    if hasattr(model, "predict_proba"):
        proba = model.predict_proba(df)[0]
        probability = float(max(proba))

    return {
        "result": str(prediction),
        "probability": probability,
    }