"use client";

import { useEffect, useState } from "react";
import { fetchModels, predict, Model, Prediction } from "@/lib/api";

export default function PredictPage() {
  const [models, setModels] = useState<Model[]>([]);
  const [modelId, setModelId] = useState<number | "">("");
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Prediction | null>(null);

  useEffect(() => {
    fetchModels().then(setModels).catch(() => {});
  }, []);

  const selectedModel = models.find((m) => m.id === modelId);
  const featureColumns = selectedModel ? selectedModel.feature_columns.split(",") : [];

  function handleModelChange(id: number | "") {
    setModelId(id);
    setInputValues({});
    setResult(null);
  }

  function handleFieldChange(field: string, value: string) {
    setInputValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!modelId) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const numericInput: Record<string, number> = {};
      for (const col of featureColumns) {
        numericInput[col] = Number(inputValues[col]);
      }

      const prediction = await predict({
        model_id: Number(modelId),
        input_data: numericInput,
      });

      setResult(prediction);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer a predição.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Predição</h1>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 max-w-md">
        <div>
          <label className="block text-sm font-medium mb-1">Modelo</label>
          <select
            value={modelId}
            onChange={(e) => handleModelChange(e.target.value ? Number(e.target.value) : "")}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">Selecione um modelo</option>
            {models.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.algorithm})
              </option>
            ))}
          </select>
        </div>

        {featureColumns.map((col) => (
          <div key={col}>
            <label className="block text-sm font-medium mb-1">{col}</label>
            <input
              type="number"
              step="any"
              value={inputValues[col] ?? ""}
              onChange={(e) => handleFieldChange(col, e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>
        ))}

        {featureColumns.length > 0 && (
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Prevendo..." : "Prever"}
          </button>
        )}
      </form>

      {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}

      {result && (
        <div className="mt-6 border rounded p-4 max-w-md bg-gray-50">
          <p className="text-sm text-gray-500">Resultado</p>
          <p className="text-2xl font-bold">{result.result}</p>
          {result.probability !== null && (
            <p className="text-sm text-gray-600 mt-1">
              Confiança: {(result.probability * 100).toFixed(1)}%
            </p>
          )}
        </div>
      )}
    </div>
  );
}