const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});