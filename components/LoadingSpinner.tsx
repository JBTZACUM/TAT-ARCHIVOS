
import React from 'react';

const LoadingSpinner: React.FC<{ size?: number }> = ({ size = 8 }) => {
  const sizeClasses = `h-${size} w-${size}`;
  return (
    <div
      className={`animate-spin rounded-full ${sizeClasses} border-b-2 border-t-2 border-sky-400`}
    ></div>
  );
};

export default LoadingSpinner;
