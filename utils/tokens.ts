import { cookies } from 'next/headers';

export const ACCESS_TOKEN_KEY = 'strava_nl_access_token';
export const REFRESH_TOKEN_KEY = 'strava_nl_refresh_token';

export function saveTokensToCookie(accessToken: string, refreshToken: string) {
  const expires = new Date();
  expires.setDate(expires.getDate() + 1);
  cookies().set(ACCESS_TOKEN_KEY, accessToken);
  cookies().set(REFRESH_TOKEN_KEY, refreshToken);
}
