import { verifyAccessToken } from '@/utils/verifyAccessToken';
import { redirect } from 'next/navigation';

// eslint-disable-next-line react/function-component-definition
export default function Home() {
  const isLoggedIn = verifyAccessToken();

  if (!isLoggedIn) {
    redirect('/login');
  }

  return <p>Strava Netherlands</p>;
}
