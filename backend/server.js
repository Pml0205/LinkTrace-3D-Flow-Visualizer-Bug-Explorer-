import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import axios from "axios";

const app = express();
app.use(cors());
const upload = multer({ dest: "uploads/" });

// Dependency Extractor
function extractDependencies(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const regex = /import .* from ['"](.*)['"]/g;
  let match, deps = [];
  while ((match = regex.exec(content)) !== null) {
    deps.push(match[1]);
  }
  return deps;
}

// Predict bug using Python AI
async function predictBug(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  try {
    const response = await axios.post("http://127.0.0.1:5000/predict", {
      code: content
    });
    return response.data.result; // "Bug detected ❌" or "No bug ✅"
  } catch (err) {
    console.error("AI prediction error:", err.message);
    return "Prediction failed ⚠️";
  }
}

// Upload Route
app.post("/upload", upload.array("files"), async (req, res) => {
  let nodes = [];
  let links = [];

  for (const file of req.files) {
    const fileName = path.basename(file.originalname);

    // Dependency extraction
    const deps = extractDependencies(file.path);

    // Bug prediction
    const bugStatus = await predictBug(file.path);

    nodes.push({ id: fileName, bug: bugStatus });

    deps.forEach(dep => {
      links.push({ source: fileName, target: dep });
    });
  }

  res.json({ nodes, links });
});

app.listen(5000, () => console.log("✅ Backend running on port 5000"));
