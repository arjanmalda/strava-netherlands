import { Activities } from '@/components/Activities';
import { Map } from '@/components/Map';
import { getDecryptedTokens } from '@/utils/decryptTokens';
import { getCommunesVisited } from '@/utils/getCommunesVisited';
import { getUserFromFirebase } from '@/utils/getUserFromFirebase';

// eslint-disable-next-line react/function-component-definition
export default async function Home() {
  const userId = getDecryptedTokens()?.athlete_id;

  if (!userId) {
    return <div>Gebruiker niet gevonden</div>;
  }

  const user = await getUserFromFirebase(userId);

  return (
    <div>
      <h1>Welcome, User!</h1>
      {/* <Map communes={communes} zoom={6} center={{ lat: 51.75768172045945, lng: 5.864468842887792 }} /> */}

      <Activities user={user}>Activiteiten</Activities>
    </div>
  );
}
