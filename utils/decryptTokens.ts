import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/utils/tokens';
import { cookies } from 'next/headers';
import CryptoJS from 'crypto-js';

export const getDecryptedTokens = async () => {
  const decryptedTokens: {
    decryptedAccessToken?: {
      access_token?: string;
      athlete_id?: number;
      expires_at?: number;
    };
    decryptedRefreshToken?: {
      refresh_token?: string;
      athlete_id?: number;
    };
  } = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/decrypt-tokens`).then((response) => response.json());

  return decryptedTokens;
};
