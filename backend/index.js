const express = require("express");
const multer = require("multer");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // For JSON parsing

// Multer setup for multiple files
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper to extract JS/TS dependencies
function parseDependencies(filename, content) {
  const regex = /(?:import .* from ['"](.+)['"]|require\(['"](.+)['"]\))/g;
  const deps = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    deps.push(match[1] || match[2]);
  }
  return deps;
}

// POST /upload route
app.post("/upload", upload.array("files"), async (req, res) => {
  const files = req.files;

  const nodes = [];
  const links = [];
  const bugData = { files: [] };

  // Create nodes
  files.forEach((file) => {
    nodes.push({ id: file.originalname });
  });

  // Create links
  files.forEach((file) => {
    const content = file.buffer.toString("utf-8");
    const deps = parseDependencies(file.originalname, content);

    deps.forEach((dep) => {
      const depFile = files.find(
        (f) => f.originalname.endsWith(dep) || f.originalname.includes(dep)
      );
      if (depFile) {
        links.push({ source: file.originalname, target: depFile.originalname });
      }
    });
  });

  // Run bug prediction
  for (const file of files) {
    const content = file.buffer.toString("utf-8");
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", { code: content });
      bugData.files.push({
        name: file.originalname,
        prediction: response.data.result
      });
    } catch (err) {
      console.error(`Prediction failed for ${file.originalname}:`, err.message);
      bugData.files.push({
        name: file.originalname,
        prediction: -1
      });
    }
  }

  res.json({
    graphData: { nodes, links },
    bugData
  });
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
