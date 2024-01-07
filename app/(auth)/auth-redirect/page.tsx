import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '@/firebase';
import CryptoJS from 'crypto-js';
import { redirect } from 'next/navigation';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/utils/tokens';
import SaveCookies from '@/components/SaveCookies';

const DEFAULT_ERROR_MESSAGE =
  'Er is een fout opgetreden bij het ophalen van de gebruikersgegevens. Probeer het later opnieuw.';

let error: string;

let hashedAccessToken;
let hashedRefreshToken;

const Page = async ({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) => {
  if (!searchParams?.code) {
    throw new Error('No code provided');
  }

  try {
    const response = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code: searchParams?.code,
        grant_type: 'authorization_code',
      }),
    });

    const json = await response.json();

    const { expires_at, access_token, refresh_token, athlete } = json;

    hashedAccessToken = CryptoJS.AES.encrypt(
      JSON.stringify({ access_token, expires_at }),
      process.env.LOGIN_SECRET!
    ).toString();
    hashedRefreshToken = CryptoJS.AES.encrypt(refresh_token, process.env.LOGIN_SECRET!).toString();

    const usersRef = collection(db, 'users');
    const q = athlete?.id ? query(usersRef, where('id', '==', athlete?.id)) : undefined;
    const querySnapshot = q ? await getDocs(q) : undefined;

    if (!!querySnapshot && querySnapshot?.docs?.length === 0) {
      await addDoc(collection(db, 'users'), {
        id: athlete.id,
        access_token: hashedAccessToken,
        refresh_token: hashedRefreshToken,
      });
    }

    if (!!querySnapshot && querySnapshot?.docs?.length > 0) {
      const userRef = doc(db, 'users', querySnapshot.docs[0].id);

      await updateDoc(userRef, {
        access_token: hashedAccessToken,
        refresh_token: hashedRefreshToken,
      });

      redirect('/');
    }

    if (!querySnapshot) {
      error = DEFAULT_ERROR_MESSAGE;
    }
  } catch (_error) {
    error = DEFAULT_ERROR_MESSAGE;
    throw _error;
  }

  return (
    <div>
      {error}
      {!!hashedAccessToken && !!hashedRefreshToken && (
        <SaveCookies
          redirectUrl="/"
          cookies={[
            { key: ACCESS_TOKEN_KEY, value: hashedAccessToken },
            { key: REFRESH_TOKEN_KEY, value: hashedRefreshToken },
          ]}
        />
      )}
    </div>
  );
};

export default Page;
