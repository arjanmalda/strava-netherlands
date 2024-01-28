import { captureException } from '@/utils/captureException';
import { getUser } from '@/utils/getUser';
import { saveUser } from '@/utils/saveUser';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { userData } = await request.json();

  try {
    await saveUser(userData);
    return NextResponse.json(userData);
  } catch (error) {
    captureException(error);
  }
  return NextResponse.json({ status: 'Bad request', statusCode: 400 });
}

export async function GET() {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({});
  }

  return NextResponse.json(user);
}
