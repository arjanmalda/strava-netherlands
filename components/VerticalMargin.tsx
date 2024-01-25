import React from 'react';

export const VerticalMargin = ({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) => {
  return <div className={size === 'small' ? 'my-2' : size === 'medium' ? 'my-4' : size === 'large' ? 'my-8' : ''} />;
};
