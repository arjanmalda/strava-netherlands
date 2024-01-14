import { getDecryptedTokens } from '@/utils/decryptTokens';

export async function verifyAccessToken() {
  try {
    const decryptedTokens = await getDecryptedTokens();

    const decryptedAccessToken = decryptedTokens?.decryptedAccessToken;

    if (!decryptedAccessToken) return false;

    const timestamp = new Date().getTime();

    return timestamp < decryptedAccessToken.expires_at || 0 * 1000;
  } catch (error) {
    console.log(error);

    return false;
  }
}
