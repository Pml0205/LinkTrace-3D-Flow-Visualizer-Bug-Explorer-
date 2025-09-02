const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/predict", async (req, res) => {
  try {
    const { code } = req.body;

    // Call Python Flask API
    const response = await axios.post("http://127.0.0.1:5000/predict", { code });
    
    res.json({
      code,
      prediction: response.data.result
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "AI prediction failed" });
  }
});

module.exports = router;
