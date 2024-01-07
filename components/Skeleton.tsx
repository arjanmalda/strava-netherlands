import React from 'react';

interface SkeletonProps {
  lines: number;
}

const Skeleton: React.FC<SkeletonProps> = ({ lines }) => {
  return (
    <div className="animate-pulse">
      {[...Array(lines)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 h-4 w-full mb-2 animate-breathe rounded-md"
          style={{ width: `${Math.floor(Math.random() * 11) + 50}%` }}></div>
      ))}
    </div>
  );
};

export default Skeleton;
