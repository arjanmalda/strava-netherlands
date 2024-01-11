import { getDecryptedAccessToken } from '@/utils/decryptTokens';
import { ACCESS_TOKEN_KEY } from '@/utils/tokens';
import CryptoJS from 'crypto-js';
import { cookies } from 'next/headers';

export function verifyAccessToken() {
  try {
    const decryptedData = getDecryptedAccessToken();

    if (!decryptedData) return false;

    const timestamp = new Date().getTime();

    return timestamp < decryptedData.expires_at * 1000;
  } catch (error) {
    return false;
  }
}
