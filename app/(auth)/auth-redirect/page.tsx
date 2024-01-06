import React from 'react';
import { redirect, useSearchParams } from 'next/navigation';

const AuthRedirectPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  if (!searchParams?.code) {
    throw new Error('No code provided');
  }

  const response = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code: searchParams?.code,
      grant_type: 'authorization_code',
    }),
  });

  const { expires_at, access_token, refresh_token, athlete } = await response.json();

  console.log({ athlete });

  return <div>{athlete?.lastname}</div>;
};

export default AuthRedirectPage;
