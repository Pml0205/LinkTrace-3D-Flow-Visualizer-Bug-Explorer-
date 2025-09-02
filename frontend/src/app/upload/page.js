"use client";
import { useState } from "react";
import UploadSection from "./UploadSection";
import Visualizer from "./Visualizer";
import GraphVisualizer from "./GraphVisualizer";
import BugChecker from "./BugChecker";

export default function HomePage() {
  const [files, setFiles] = useState([]);
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  return (
    <div className="upload-wrapper">
      <div className="upload-container">
        {/* Upload */}
        <UploadSection onFilesSelected={setFiles} />

        {/* Dependency Graph */}
        <Visualizer files={files} setGraphData={setGraphData} />

        {/* GraphVisualizer (3D view) */}
        <GraphVisualizer graphData={graphData} />

        {/* BugChecker (Error Section) */}
        <BugChecker files={files} />
      </div>
    </div>
  );
}
