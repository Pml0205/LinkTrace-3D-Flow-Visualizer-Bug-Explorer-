"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [file, setFile] = useState(null);
  const router = useRouter();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Graph from backend:", data);

    localStorage.setItem("graphData", JSON.stringify(data));
    router.push("/visualizer");
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Upload Project Folder (zip)</h1>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".zip" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
