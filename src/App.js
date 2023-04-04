import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import ImageSlider from './component/ImageSlider';
import loadimages from "./function/loadimages";

const images = loadimages();

function App() {
  const [dream, setDream] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const imageKeys = Object.keys(images);

  console.log(imageKeys);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
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
      {loading && <ImageSlider images={imageKeys} interval={5000} />}
      {result && (
          <div>
            <h2>Dream Interpretation</h2>
            <p>{result.dream}</p>
            <p>{result.dream_resolution}</p>
            <img src={result.image_url} alt="Dream Visualization"
                 style={{ maxWidth: '60%', maxHeight: '60%', margin: "2%" }}/>
          </div>
      )}
    </div>
    );
}

export default App;

