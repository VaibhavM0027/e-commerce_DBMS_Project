import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 h-64 rounded-t-xl"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
        <div className="h-8 bg-gray-300 rounded mb-2"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
