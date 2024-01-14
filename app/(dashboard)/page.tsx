import { getCommunesVisited } from '@/utils/getCommunesVisited';

// eslint-disable-next-line react/function-component-definition
export default async function Home() {
  const communes = await getCommunesVisited();

  return <p>Strava Netherlands</p>;
}
