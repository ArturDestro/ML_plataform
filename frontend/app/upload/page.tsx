"use client";

import { useEffect, useState } from "react";
import { uploadDataset, fetchDatasets, Dataset } from "@/lib/api";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadDatasets() {
    try {
      const data = await fetchDatasets();
      setDatasets(data);
    } catch (err) {
      setError("Não foi possível carregar os datasets.");
    }
  }

  useEffect(() => {
    loadDatasets();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      await uploadDataset(file);
      setFile(null);
      await loadDatasets();
    } catch (err) {
      setError("Falha ao enviar o dataset. Confirme se o arquivo é um CSV válido.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Upload de Dataset</h1>

      <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-3">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="text-sm"
        />
        <button
          type="submit"
          disabled={!file || loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}

      <h2 className="text-xl font-semibold mt-8">Datasets enviados</h2>

      {datasets.length === 0 ? (
        <p className="text-gray-500 mt-2">Nenhum dataset enviado ainda.</p>
      ) : (
        <table className="mt-4 w-full text-sm border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Nome</th>
              <th className="py-2">Linhas</th>
              <th className="py-2">Colunas</th>
              <th className="py-2">Enviado em</th>
            </tr>
          </thead>
          <tbody>
            {datasets.map((d) => (
              <tr key={d.id} className="border-b">
                <td className="py-2">{d.name}</td>
                <td className="py-2">{d.num_rows}</td>
                <td className="py-2">{d.num_columns}</td>
                <td className="py-2">
                  {new Date(d.uploaded_at).toLocaleString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}