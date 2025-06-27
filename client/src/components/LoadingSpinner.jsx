// src/components/LoadingSpinner.jsx
import React from 'react';
function LoadingSpinner({ size = 40, color = 'border-blue-500' }) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-4 border-t-transparent ${color}`}
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
}

export default LoadingSpinner;
