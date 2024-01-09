import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const {
    tokenCookies,
  }: {
    tokenCookies: {
      key: string;
      value: string;
    }[];
  } = await request.json();

  try {
    tokenCookies.forEach((cookie) => {
      cookies().set(cookie.key, cookie.value, { expires: 365 });
    });

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    throw new Error('Error refreshing token');
  }
}
