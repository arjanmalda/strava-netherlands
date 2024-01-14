import { REFRESH_TOKEN_KEY } from '@/utils/tokens';
import { cookies } from 'next/headers';
import { captureException } from '@/utils/captureException';
import { getDecryptedTokens } from '@/utils/decryptTokens';

const TOKEN_ENDPOINT = 'https://www.strava.com/oauth/token';

export async function refreshTokens() {
  const refresh_token = cookies().get(REFRESH_TOKEN_KEY)?.value;

  if (!refresh_token) {
    return;
  }

  const decryptedTokens = await getDecryptedTokens();

  const decryptedData = decryptedTokens?.decryptedRefreshToken;

  const body = JSON.stringify({
    client_id: process.env.STRAVA_CLIENT_ID,
    client_secret: process.env.STRAVA_CLIENT_SECRET,
    refresh_token: decryptedData?.refresh_token,
    grant_type: 'refresh_token',
  });

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body,
  });

  if (!response.ok) {
    captureException('Failed to refresh tokens through Strava API');
  }

  const tokens: {
    token_type?: string;
    access_token?: string;
    expires_at?: number;
    expires_in?: number;
    refresh_token?: string;
  } = await response.json();

  return { ...tokens, athlete_id: decryptedData?.athlete_id };
}
