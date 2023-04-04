import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [dream, setDream] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`/api/gpt/${dream}`);
      setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
};

return (
    <div className="App">
      <h1>Dream Interpreter</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dream-input">Enter your dream:</label>
        <textarea
            id="dream-input"
            value={dream}
            onChange={(e) => setDream(e.target.value)}
            rows="4"
            cols="50"
        ></textarea>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {result && (
          <div>
            <h2>Dream Interpretation</h2>
            <p>{result.dream}</p>
            <p>{result.dream_resolution}</p>
            <img src={result.image_url} alt="Dream Visualization" />
          </div>
      )}
    </div>
);
}

export default App;

