import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/utils/tokens';
import { cookies } from 'next/headers';
import CryptoJS from 'crypto-js';

export const getDecryptedAccessToken = () => {
  const access_token = cookies().get(ACCESS_TOKEN_KEY)?.value;
  const allCookies = cookies();

  if (!access_token) {
    return;
  }

  const bytes = CryptoJS.AES.decrypt(access_token, process.env.LOGIN_SECRET!);

  const decryptedData: {
    access_token?: string;
    athlete_id?: number;
    expires_at?: number;
  } = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return decryptedData;
};

export const getDecryptedRefreshToken = () => {
  const refresh_token = cookies().get(REFRESH_TOKEN_KEY)?.value;

  if (!refresh_token) {
    return;
  }

  const bytes = CryptoJS.AES.decrypt(refresh_token, process.env.LOGIN_SECRET!);
  const decryptedData: {
    refresh_token?: string;
    athlete_id?: number;
  } = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return decryptedData;
};
