'use server';

import { cookies } from 'next/headers';

export const fetchApi = async <T>(url: string, options?: RequestInit): Promise<T | null> => {
  const accessToken = cookies().get('accessToken');

  const response = await fetch(`${process.env.API_ENDPOINT}${url}`, {
    method: options?.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken.value}` } : {}),
      ...options?.headers,
    },
    ...options,
  });

  if (response.status === 401) {
    const currentRefreshToken = cookies().get('refreshToken');
    if (!currentRefreshToken) {
      return null;
    }

    const tokenResponse = await fetch(`${process.env.API_ENDPOINT}`, {
      method: 'POST',
      body: JSON.stringify({ refreshToken: currentRefreshToken.value }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!tokenResponse.ok) {
      return null;
    }

    return fetchApi(url, options);
  }

  return response.json();
};
