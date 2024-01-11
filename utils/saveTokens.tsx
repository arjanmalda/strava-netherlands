import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '@/firebase';
import CryptoJS from 'crypto-js';
import { redirect } from 'next/navigation';

export const saveTokens = async ({
  access_token,
  expires_at,
  refresh_token,
  athlete_id,
}: {
  access_token?: string;
  expires_at?: number;
  refresh_token?: string;
  athlete_id?: number;
}) => {
  let hashedAccessToken;
  let hashedRefreshToken;

  try {
    hashedAccessToken = CryptoJS.AES.encrypt(
      JSON.stringify({ access_token, expires_at, athlete_id }),
      process.env.LOGIN_SECRET!
    ).toString();

    hashedRefreshToken = CryptoJS.AES.encrypt(
      JSON.stringify({
        refresh_token,
        athlete_id,
      }),
      process.env.LOGIN_SECRET!
    ).toString();

    const usersRef = collection(db, 'users');
    const q = athlete_id ? query(usersRef, where('id', '==', athlete_id)) : undefined;
    const querySnapshot = q ? await getDocs(q) : undefined;

    if (!!querySnapshot && querySnapshot?.docs?.length === 0) {
      await addDoc(collection(db, 'users'), {
        id: athlete_id,
        refresh_token: hashedRefreshToken,
      });
    }

    if (!!querySnapshot && querySnapshot?.docs?.length > 0) {
      const userRef = doc(db, 'users', querySnapshot.docs[0].id);

      await updateDoc(userRef, {
        refresh_token: hashedRefreshToken,
      });
    }
  } catch {
    redirect('/login');
  }

  return { hashedAccessToken, hashedRefreshToken };
};
