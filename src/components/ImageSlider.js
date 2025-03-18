import React, { useState } from "react";
import "./imageSlider.css"; // CSS for styling

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="slider-container">
      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      <div className="slider">
        <img src={images[currentIndex]} alt="Project Screenshot" className="slider-image" />
      </div>
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default ImageSlider;
