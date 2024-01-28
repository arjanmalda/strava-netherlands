import { getDecryptedAccessToken } from '@/utils/decryptTokens';

export function verifyAccessToken() {
  try {
    const decryptedData = getDecryptedAccessToken();

    if (!decryptedData) return false;

    const timestamp = new Date().getTime();
    if (decryptedData.expires_at) return timestamp < decryptedData.expires_at * 1000;
  } catch (error) {
    return false;
  }
}
