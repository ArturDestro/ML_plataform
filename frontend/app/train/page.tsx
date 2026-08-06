"use client";

import { useEffect, useState } from "react";
import { fetchDatasets, trainModel, Dataset } from "@/lib/api";

export default function TrainPage() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [datasetId, setDatasetId] = useState<number | "">("");
  const [name, setName] = useState("");
  const [algorithm, setAlgorithm] = useState("logistic_regression");
  const [targetColumn, setTargetColumn] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchDatasets().then(setDatasets).catch(() => {});
  }, []);

  const selectedDataset = datasets.find((d) => d.id === datasetId);
  const availableColumns = selectedDataset ? selectedDataset.columns.split(",") : [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!datasetId || !targetColumn) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const model = await trainModel({
        dataset_id: Number(datasetId),
        name,
        algorithm,
        target_column: targetColumn,
      });
      setSuccess(`Modelo "${model.name}" treinado com sucesso! Accuracy: ${model.accuracy.toFixed(2)}`);
      setName("");
      setTargetColumn("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao treinar o modelo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Treinar Modelo</h1>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 max-w-md">
        <div>
          <label className="block text-sm font-medium mb-1">Dataset</label>
          <select
            value={datasetId}
            onChange={(e) => {
              setDatasetId(e.target.value ? Number(e.target.value) : "");
              setTargetColumn("");
            }}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">Selecione um dataset</option>
            {datasets.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.num_rows} linhas)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Nome do modelo</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Algoritmo</label>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="logistic_regression">Logistic Regression</option>
            <option value="random_forest">Random Forest</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Coluna alvo (target)</label>
          <select
            value={targetColumn}
            onChange={(e) => setTargetColumn(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            disabled={!datasetId}
          >
            <option value="">Selecione a coluna</option>
            {availableColumns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading || !datasetId || !targetColumn}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Treinando..." : "Treinar"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}
      {success && <p className="text-green-600 mt-4 text-sm">{success}</p>}
    </div>
  );
}