'use client';

import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface SaveCookiesProps {
  incomingCookies: { key: string; value: string }[];
  redirectUrl?: string;
}

export const SaveCookies = ({ redirectUrl, incomingCookies }: SaveCookiesProps) => {
  const router = useRouter();
  useEffect(() => {
    incomingCookies.forEach((cookie) => {
      console.log({ cookie });

      Cookies.set(cookie.key, cookie.value, { expires: 365 });
    });
    if (redirectUrl) {
      router.replace(redirectUrl);
    }
  }, []);

  return <p>You are being redirected</p>;
};
