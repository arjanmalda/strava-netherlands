'use client';

import React, { useEffect } from 'react';
import { redirect } from 'next/navigation';
import Cookie from 'js-cookie';

interface SaveCookiesProps {
  cookies: { key: string; value: string }[];
  redirectUrl?: string;
}

const SaveCookies: React.FC<SaveCookiesProps> = ({ redirectUrl, cookies }) => {
  useEffect(() => {
    cookies.forEach((cookie) => {
      Cookie.set(cookie.key, cookie.value, { expires: 365 });
    });
    if (redirectUrl) {
      redirect(redirectUrl);
    }
  }, [cookies]);

  return <div />;
};

export default SaveCookies;
