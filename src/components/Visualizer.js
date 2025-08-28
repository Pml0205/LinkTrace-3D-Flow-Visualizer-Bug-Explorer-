"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), { ssr: false });

export default function Visualizer({ files }) {
  const [data, setData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    if (files.length > 0) {
      fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder: "testf" }) // adjust if needed
      })
        .then((res) => res.json())
        .then((graph) => {
          console.log("Graph Data:", graph);
          setData(graph);
        });
    }
  }, [files]);

  if (!data.nodes.length) return <p>No graph to show</p>;

  return (
    <div style={{ height: "600px" }}>
      <ForceGraph3D
        graphData={data}
        nodeAutoColorBy="id"
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
      />
    </div>
  );
}
