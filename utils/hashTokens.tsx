import CryptoJS from 'crypto-js';
import { redirect } from 'next/navigation';

export const hashTokens = async ({
  access_token,
  expires_at,
  refresh_token,
  athlete_id,
}: {
  access_token?: string;
  expires_at?: number;
  refresh_token?: string;
  athlete_id?: number;
}) => {
  let hashedAccessToken;
  let hashedRefreshToken;

  try {
    hashedAccessToken = CryptoJS.AES.encrypt(
      JSON.stringify({ access_token, expires_at, athlete_id }),
      process.env.LOGIN_SECRET!
    ).toString();

    hashedRefreshToken = CryptoJS.AES.encrypt(
      JSON.stringify({
        refresh_token,
        athlete_id,
      }),
      process.env.LOGIN_SECRET!
    ).toString();
  } catch {
    redirect('/login');
  }

  return { hashedAccessToken, hashedRefreshToken };
};
