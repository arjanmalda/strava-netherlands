import { Button } from '@/components/Button';
import { SignOutButton } from '@/components/SignOutButton';
import Image from 'next/image';
import React from 'react';

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 flex justify-between w-full py-1 bg-white border z-100 border-t-1">
      <div className={'[&_svg]:stroke-whitie'}>
        <SignOutButton />
      </div>
      <div className="flex pt-2">
        <span className="-translate-x-12 -mr-11 text-xxs text-gray-950">Powered by</span>
        <div className="mr-2">
          <Image height={20} width={80} loading="lazy" src="/strava-logo.png" alt="Strava logo" />
        </div>
      </div>
    </footer>
  );
};
