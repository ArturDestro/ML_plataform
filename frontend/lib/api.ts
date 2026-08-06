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