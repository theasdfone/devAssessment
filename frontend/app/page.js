"use client";

import { useMemo, useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export default function HomePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasFile = useMemo(() => Boolean(selectedFile), [selectedFile]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setResult(null);

    if (!selectedFile) {
      setError("Choose a document before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("document", selectedFile);

    try {
      setIsSubmitting(true);

      const response = await fetch(`${API_BASE_URL}/api/assessment/summarize`, {
        method: "POST",
        body: formData
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "The API request failed.");
      }

      setResult(payload);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page">
      <section className="panel">
        <p className="eyebrow">Candidate Exercise Starter</p>
        <h1>Document OCR + Summary Workflow</h1>
        <p>
          This starter repo lets a candidate upload a file from a Next.js frontend,
          send it to an Express API, and then replace the server stubs with OCR and
          OpenAI integration.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            name="document"
            onChange={(event) => {
              setSelectedFile(event.target.files?.[0] ?? null);
            }}
          />
          <button type="submit" disabled={!hasFile || isSubmitting}>
            {isSubmitting ? "Uploading..." : "Upload and summarize"}
          </button>
        </form>

        {error ? <div className="error">{error}</div> : null}

        {result ? (
          <div className="result">
            <strong>API response</strong>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        ) : null}
      </section>
    </main>
  );
}
