import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

const ImageSlider = ({ images, interval }) => {
    const startImageIndex = Math.floor(Math.random() * (28 - 1 + 1)) + 1;
    const [currentImageIndex, setCurrentImageIndex] = useState(startImageIndex);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images, interval]);//

    useEffect(() => {
        const totalTime = 45000; // 80초
        const intervalTime = 1000; // 1초마다 진행바 업데이트
        const increment = (intervalTime / totalTime) * 100;

        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prevProgress + increment;
            });
        }, intervalTime);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>꿈 그리는 중...</h1>
            <ProgressBar progress={progress} />
            <img
                src={`${process.env.PUBLIC_URL}/img/${images[currentImageIndex]}`}
                alt={`Image ${currentImageIndex}`}
                style={{ maxWidth: '60%', maxHeight: '60%', margin: "5%" }}
            />
        </div>
    );
};

const ProgressBar = ({ progress }) => {
    return (
        <div className="progress-bar-container">
            <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
            ></div>
            <div className="progress-bar-text">
                {`${Math.round(progress)}%`}
            </div>
        </div>
    );
};
export default ImageSlider;
