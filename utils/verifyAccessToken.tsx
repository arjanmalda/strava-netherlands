import { ACCESS_TOKEN_KEY } from '@/utils/tokens';
import CryptoJS from 'crypto-js';
import { cookies } from 'next/headers';

export function verifyAccessToken() {
  try {
    const access_token = cookies().get(ACCESS_TOKEN_KEY)?.value;

    if (!access_token) return false;

    const bytes = CryptoJS.AES.decrypt(access_token, process.env.LOGIN_SECRET!);
    const decryptedData:
      | {
          access_token: string;
          expires_at: number;
        }
      | undefined = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    if (!decryptedData) return false;

    const timestamp = new Date().getTime();

    return timestamp < decryptedData.expires_at * 1000;
  } catch (error) {
    return false;
  }
}
