import React, { useState, useEffect } from 'react';

const ImageSlider = ({ images, interval }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images, interval]);

    return (
        <div>
            <img
                src={`${process.env.PUBLIC_URL}/img/${images[currentImageIndex]}`}
                alt={`Image ${currentImageIndex}`}
                style={{ maxWidth: '60%', maxHeight: '60%', margin: "5%" }}
            />
        </div>
    );
};

export default ImageSlider;
