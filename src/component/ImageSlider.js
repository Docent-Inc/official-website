
import React, { useState } from "react";
import "../css/ImageSlider.css";

function ImageSlider({ images, currentIndex, setCurrentIndex }) {
    const [startX, setStartX] = useState(0);
    const [endX, setEndX] = useState(0);

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setEndX(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (startX - endX > 50) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        } else if (startX - endX < -50) {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        }
    };

    return (
        <div className="image-slider">
            <img
                src={images[currentIndex]}
                alt="슬라이드 이미지"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            />
            <div className="image-index">
                <span className="current-image">{currentIndex + 1}</span>
                <span className="separator">/</span>
                <span className="total-images">{images.length}</span>
            </div>
        </div>
    );
}

export default ImageSlider;