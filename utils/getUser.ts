import { getDecryptedAccessToken } from '@/utils/decryptTokens';
import { db } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const getUser = async () => {
  const userId = getDecryptedAccessToken()?.athlete_id;

  if (!userId) return;

  try {
    const usersRef = collection(db, 'users');

    const q = query(usersRef, where('id', '==', userId));

    const userSnapshot = await getDocs(q);
    const user = userSnapshot.docs?.[0]?.data();

    return user;
  } catch (error) {
    console.error('Error fetching user from Firebase:', error);
    throw error;
  }
};
