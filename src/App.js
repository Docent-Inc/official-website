import React, { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';
import ImageSlider from './component/ImageSlider';
import html2canvas from 'html2canvas';
import loadimages from "./function/loadimages";

const images = loadimages();

function App() {
  const [dream, setDream] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const captureRef = useRef(null);

  const imageKeys = Object.keys(images);

  console.log(imageKeys);

  const captureAndDownload = async () => {
    if (!captureRef.current) return;

    const canvas = await html2canvas(captureRef.current, { allowTaint: true });
    const imgDataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');

    link.href = imgDataUrl;
    link.download = 'screenshot.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      <h1>비몽사몽</h1>
      <form onSubmit={handleSubmit} style={{justifyContent: "center"}}>
        <label htmlFor="dream-input">꿈을 입력해보세요:</label>
        <textarea
            id="dream-input"
            value={dream}
            onChange={(e) => setDream(e.target.value)}
            rows="4"
            cols="50"
        ></textarea>
        <button type="submit" disabled={loading}>
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
              <p style={{ textAlign: 'justify', margin: '2%' }}>{result.dream}</p>
              <p style={{ textAlign: 'justify', margin: '2%' }}>
                {result.dream_resolution}
              </p>
            </div>
            <button onClick={captureAndDownload} disabled={"True"}>
              화면 캡쳐 및 다운로드
            </button>
          </>
      )}
    </div>
    );
}

export default App;

