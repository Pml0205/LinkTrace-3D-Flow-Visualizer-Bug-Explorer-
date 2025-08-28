'use client';
import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";

const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), { ssr: false });

export default function GraphVisualizer({ graphData }) {
  const fgRef = useRef();

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force("charge").strength(-100);
    }
  }, [graphData]);

  if (!graphData || !graphData.nodes.length) {
    return <p style={{ color: "white" }}>⚠ No dependencies found</p>;
  }

  return (
    <div style={{ width: "100%", height: "70vh", background: "black" }}>
      <ForceGraph3D
        ref={fgRef}
        graphData={graphData}
        nodeAutoColorBy="id"
        nodeLabel="id"
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.01}
      />
    </div>
  );
}
