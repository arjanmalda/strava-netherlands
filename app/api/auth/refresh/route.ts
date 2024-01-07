import { NextResponse } from 'next/server';

const TOKEN_ENDPOINT = 'https://www.strava.com/oauth/token';

export async function POST(request: Request) {
  const { refreshToken } = await request.json();

  const body = JSON.stringify({
    client_id: process.env.STRAVA_CLIENT_ID,
    client_secret: process.env.STRAVA_CLIENT_SECRET,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  });

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body,
    });

    const tokens = await response.json();

    return NextResponse.json({ accessToken: tokens.access_token });
  } catch (error) {
    throw new Error('Error refreshing token');
  }
}
