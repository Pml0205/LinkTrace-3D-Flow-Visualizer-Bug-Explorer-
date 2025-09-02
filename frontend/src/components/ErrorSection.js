'use client';
import React from "react";

export default function ErrorSection({ data }) {
  if (!data || !data.files) return <p style={{ color: "red" }}>⚠ No bug data available</p>;

  const hasBug = data.files.some(f => f.prediction === 1);

  return (
    <div style={{ marginTop: "2rem", padding: "1rem", background: "#1e293b", borderRadius: "0.75rem", color: "white" }}>
      <h2 style={{ marginBottom: "1rem" }}>🛑 Bug Detection Results</h2>

      {data.files.map((file, idx) => (
        <div key={idx} style={{ marginBottom: "0.75rem", padding: "0.5rem", background: "#334155", borderRadius: "0.5rem" }}>
          <strong>{file.name}:</strong>{" "}
          {file.prediction === 1 ? (
            <span style={{ color: "#f87171" }}>Bug detected ❌</span>
          ) : file.prediction === 0 ? (
            <span style={{ color: "#34d399" }}>No bug ✅</span>
          ) : (
            <span style={{ color: "#facc15" }}>Prediction failed ⚠️</span>
          )}
        </div>
      ))}

      <hr style={{ margin: "1rem 0", borderColor: "#64748b" }} />

      <h3>
        Overall Status:{" "}
        {hasBug ? (
          <span style={{ color: "#f87171" }}>Bug(s) Found ❌</span>
        ) : (
          <span style={{ color: "#34d399" }}>No Bugs ✅</span>
        )}
      </h3>
    </div>
  );
}
