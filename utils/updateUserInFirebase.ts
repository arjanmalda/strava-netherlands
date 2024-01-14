import { db } from '@/firebase';
import { collection, query, where, getDocs, addDoc, doc, updateDoc, FieldValue } from 'firebase/firestore';

export async function updateUserInFirebase(
  userId: number,
  data: { [x: string]: FieldValue | Partial<unknown> | undefined }
) {
  try {
    const usersRef = collection(db, 'users');
    const q = userId ? query(usersRef, where('id', '==', userId)) : undefined;
    const querySnapshot = q ? await getDocs(q) : undefined;

    if (!querySnapshot) return;
    if (!!querySnapshot && querySnapshot?.docs?.length === 0) {
      await addDoc(collection(db, 'users'), data);
    }

    if (!!querySnapshot && querySnapshot?.docs?.length > 0) {
      const userRef = doc(db, 'users', querySnapshot.docs[0].id);

      await updateDoc(userRef, data);
    }
  } catch (error) {
    console.error('Error updating user in Firebase:', error);
    throw error;
  }
}
