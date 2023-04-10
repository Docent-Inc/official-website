import React, { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';
import ImageSlider from './component/ImageSlider';
import loadimages from "./function/loadimages";

const images = loadimages();

function App() {
  const [dream, setDream] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const captureRef = useRef(null);

  const imageKeys = Object.keys(images);

  console.log(imageKeys);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    if (dream.length < 5 || dream.length > 100) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`/api/gpt/${dream}`);
      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("OpenAI 정책에 맞지 않는 내용이 포함되어 있습니다. 다시 입력해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = dream.length < 5 || dream.length > 100;

  const handleDreamChange = (e) => {
    setDream(e.target.value);
    setCharCount(e.target.value.length);
  };

  return (
      <div className="App">
        <h1>비몽사몽</h1>
        <form onSubmit={handleSubmit} style={{justifyContent: "center"}}>
          <label htmlFor="dream-input">꿈을 입력해보세요:</label>
          <div className="textarea-container">
          <textarea
              id="dream-input"
              value={dream}
              onChange={(e) => handleDreamChange(e)}
              rows="4"
              cols="50"
          ></textarea>
            <div className="char-count">{charCount}</div>
          </div>
          <button type="submit" disabled={loading || isDisabled}>
            {loading ? 'Loading...' : '꿈 그리기'}
          </button>
        </form>
        {loading && <ImageSlider images={imageKeys} interval={5000} />}
        {result && (
            <>
              <div ref={captureRef} style={{ border: '5px solid #000000', margin: '3%' }}>
                <h2>{result.dream_name}</h2>
                <img
                    src={`${result.image_url}`}
                    alt="Dream Visualization"
                    style={{
                      border: '10px solid #000000',
                      borderRadius: '40px',
                      maxWidth: '60%',
                      maxHeight: '60%',
                      margin: '2%',
                    }}
                />
                <p style={{ textAlign: 'justify', margin: '2%' }}>{result.data.dream}</p>
                <p style={{ textAlign: 'justify', margin: '2%' }}>{result.data.dream_resolution}</p>
                <p style={{ textAlign: 'justify', margin: '2%' }}>{result.data.today_luck}</p>
              </div>
            </>
        )}
      </div>
  );
}

export default App;
