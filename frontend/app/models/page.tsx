"use client";

import { useEffect, useState } from "react";
import { fetchModels, Model } from "@/lib/api";

export default function ModelsPage() {
  const [models, setModels] = useState<Model[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchModels()
      .then(setModels)
      .catch(() => setError("Não foi possível carregar os modelos."));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Modelos Treinados</h1>

      {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}

      {models.length === 0 ? (
        <p className="text-gray-500 mt-4">Nenhum modelo treinado ainda.</p>
      ) : (
        <table className="mt-4 w-full text-sm border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Nome</th>
              <th className="py-2">Algoritmo</th>
              <th className="py-2">Target</th>
              <th className="py-2">Accuracy</th>
              <th className="py-2">Precision</th>
              <th className="py-2">Recall</th>
              <th className="py-2">F1-Score</th>
              <th className="py-2">Treinado em</th>
            </tr>
          </thead>
          <tbody>
            {models.map((m) => (
              <tr key={m.id} className="border-b">
                <td className="py-2">{m.name}</td>
                <td className="py-2">{m.algorithm}</td>
                <td className="py-2">{m.target_column}</td>
                <td className="py-2">{m.accuracy.toFixed(2)}</td>
                <td className="py-2">{m.precision.toFixed(2)}</td>
                <td className="py-2">{m.recall.toFixed(2)}</td>
                <td className="py-2">{m.f1_score.toFixed(2)}</td>
                <td className="py-2">
                  {new Date(m.created_at).toLocaleString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}