'use client';

import { Loader } from '@/components/Loader';
import { useEffect, useState } from 'react';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      {progress > 10 && progress < 30 && <div>We zijn even aan het warmdraaien...</div>}
      {progress > 30 && progress < 60 && <div>Activiteitengeschiedenis analyseren...</div>}
      {progress > 60 && progress < 80 && <div>Gemeentes aan het berekenen...</div>}
      {progress > 80 && <div>De laatste loodjes...</div>}
      <Loader />
    </div>
  );
};
