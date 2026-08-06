const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Dataset {
  id: number;
  name: string;
  columns: string;
  num_rows: number;
  num_columns: number;
  uploaded_at: string;
}

export async function uploadDataset(file: File): Promise<Dataset> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/datasets/`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Falha ao enviar o dataset");
  }

  return response.json();
}

export async function fetchDatasets(): Promise<Dataset[]> {
  const response = await fetch(`${API_URL}/datasets/`);

  if (!response.ok) {
    throw new Error("Falha ao buscar datasets");
  }

  return response.json();

}
  
  export interface Model {
  id: number;
  dataset_id: number;
  name: string;
  algorithm: string;
  target_column: string;
  feature_columns: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  created_at: string;
}

export interface TrainRequest {
  dataset_id: number;
  name: string;
  algorithm: string;
  target_column: string;
}

export async function trainModel(data: TrainRequest): Promise<Model> {
  const response = await fetch(`${API_URL}/train/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Falha ao treinar o modelo");
  }

  return response.json();
}

export async function fetchModels(): Promise<Model[]> {
  const response = await fetch(`${API_URL}/train/`);

  if (!response.ok) {
    throw new Error("Falha ao buscar modelos");
  }

  return response.json();
}