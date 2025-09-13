import { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPrediction(null);

    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      if (response.ok) {
        setPrediction(data);
      } else {
        setError(data.error || 'Prediction failed');
      }
    } catch (err) {
      setError('Server error');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Sentiment Analyzer</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter text here..."
          rows="10"
          cols="50"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <button type="submit" disabled={loading || !text.trim()}>
          {loading ? 'Predicting...' : 'Predict'}
        </button>
      </form>
      {prediction && (
        <div>
          <h2>Result</h2>
          <p>
            Sentiment: <b>{prediction.label === 1 ? 'Positive' : 'Negative'}</b>
          </p>
          <p>Probability: {prediction.probability.toFixed(2)}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;