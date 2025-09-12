const express = require('express');

const app = express();
const PORT = 5000;


app.post("/api/predict", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    const response = await axios.post("http://localhost:8000/predict", { text });

    res.json(response.data);
  } catch (err) { 
    console.error(err.message);
    res.status(500).json({ error: "Prediction failed" });
  }
});