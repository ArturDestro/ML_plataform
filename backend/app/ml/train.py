import os
import uuid

import joblib
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

MODELS_DIR = "storage/models"

ALGORITHMS = {
    "logistic_regression": LogisticRegression,
    "random_forest": RandomForestClassifier,
}


def train_and_evaluate(df: pd.DataFrame, target_column: str, algorithm: str):
    if algorithm not in ALGORITHMS:
        raise ValueError(f"Algoritmo '{algorithm}' não suportado.")

    if target_column not in df.columns:
        raise ValueError(f"Coluna alvo '{target_column}' não encontrada no dataset.")

    feature_columns = [col for col in df.columns if col != target_column]

    non_numeric = df[feature_columns].select_dtypes(exclude=["number"]).columns.tolist()
    if non_numeric:
        raise ValueError(
            f"As colunas {non_numeric} contêm valores não numéricos. "
            "Remova-as ou converta para numérico antes de treinar."
        )

    X = df[feature_columns]
    y = df[target_column]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model_class = ALGORITHMS[algorithm]
    model = model_class()
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)

    metrics = {
        "accuracy": float(accuracy_score(y_test, y_pred)),
        "precision": float(precision_score(y_test, y_pred, average="weighted", zero_division=0)),
        "recall": float(recall_score(y_test, y_pred, average="weighted", zero_division=0)),
        "f1_score": float(f1_score(y_test, y_pred, average="weighted", zero_division=0)),
    }

    os.makedirs(MODELS_DIR, exist_ok=True)
    file_name = f"{uuid.uuid4().hex}.joblib"
    file_path = os.path.join(MODELS_DIR, file_name)
    joblib.dump(model, file_path)

    return {
        "file_path": file_path,
        "feature_columns": feature_columns,
        "metrics": metrics,
    }