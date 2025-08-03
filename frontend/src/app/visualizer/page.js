'use client';

import { useEffect, useState } from 'react';

export default function VisualizerPage() {
  const [graph, setGraph] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/graph')
      .then(res => res.json())
      .then(data => setGraph(data))
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <div>
      <h2>3D Visualizer (Coming Soon)</h2>
      {graph ? (
        <pre>{JSON.stringify(graph, null, 2)}</pre>
      ) : (
        <p>Loading graph...</p>
      )}
    </div>
  );
}
