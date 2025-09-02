'use client';
import React, { useState, useRef } from "react";
import GraphVisualizer from "./GraphVisualizer";
import ErrorSection from "./ErrorSection";

export default function UploadSection() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [graphData, setGraphData] = useState(null);
  const [bugData, setBugData] = useState(null);
  const fileInputRef = useRef(null);

  const handleFiles = (fileList) => {
    const acceptedExtensions = ['.js', '.ts', '.jsx', '.tsx'];
    const newFiles = Array.from(fileList)
      .filter(file => acceptedExtensions.some(ext => file.name.endsWith(ext)))
      .map(file => ({ file, path: file.name }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleFileInput = (e) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!files.length) return;
    setUploading(true);

    const formData = new FormData();
    files.forEach(({ file, path }) => formData.append("files", file, path));

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setGraphData(data.graphData);
      setBugData(data.bugData);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }

    setUploading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Upload Your Project</h1>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        webkitdirectory="true"
        directory=""
        onChange={handleFileInput}
        style={{ display: "none" }}
      />

      <button onClick={() => fileInputRef.current.click()}>Browse Folder</button>
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Start Visualization"}
      </button>

      {graphData && (
        <div style={{ marginTop: "30px" }}>
          <h2>📊 Dependency Graph</h2>
          <GraphVisualizer graphData={graphData} />
        </div>
      )}

      {bugData && (
        <div style={{ marginTop: "30px" }}>
          <ErrorSection data={bugData} />
        </div>
      )}
    </div>
  );
}
