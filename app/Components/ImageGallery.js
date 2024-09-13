'use client';
import { useState } from 'react';

/**
 * ImageGallery component displays a carousel of images with navigation controls.
 * 
 * @function ImageGallery
 * @param {Object} props - The component props.
 * @param {string[]} props.images - Array of image URLs to be displayed in the gallery.
 * @returns {JSX.Element} The component rendering the image gallery.
 */
export default function ImageGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * Handle the action to show the previous image in the gallery.
   */
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  /**
   * Handle the action to show the next image in the gallery.
   */
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full h-96 overflow-hidden mb-4 bg-gray-200 rounded-lg">
      <img
        src={images[currentIndex]}
        alt={`Product Image ${currentIndex + 1}`}
        className="object-contain w-full h-full transition-transform duration-300"
      />
      {images.length > 1 && (
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4">
          <button
            className="bg-white rounded-full p-2 shadow-md hover:bg-gray-200"
            onClick={handlePrev}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="bg-white rounded-full p-2 shadow-md hover:bg-gray-200"
            onClick={handleNext}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
