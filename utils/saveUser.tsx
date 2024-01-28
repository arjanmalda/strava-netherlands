import { db } from '@/firebase';
import { getDecryptedAccessToken } from '@/utils/decryptTokens';
import { collection, query, where, getDocs, addDoc, doc, updateDoc, AddPrefixToKeys } from 'firebase/firestore';

export const saveUser = async (newUserData: { [x: string]: any } & AddPrefixToKeys<string, any>) => {
  const userId = getDecryptedAccessToken()?.athlete_id;

  try {
    const usersRef = collection(db, 'users');
    const q = userId ? query(usersRef, where('id', '==', userId)) : undefined;
    const querySnapshot = q ? await getDocs(q) : undefined;

    if (!querySnapshot) return;
    if (!!querySnapshot && querySnapshot?.docs?.length === 0) {
      await addDoc(collection(db, 'users'), newUserData);
    }

    if (!!querySnapshot && querySnapshot?.docs?.length > 0) {
      const userRef = doc(db, 'users', querySnapshot.docs[0].id);

      await updateDoc(userRef, newUserData);
    }
  } catch (error) {
    console.error('Error updating user in Firebase:', error);
    throw error;
  }
};
