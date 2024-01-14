import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function getUserFromFirebase(userId: number) {
  try {
    const userSnapShot = await getDocs(collection(db, 'users'));
    const user = userSnapShot.docs[0].data();

    return user;
  } catch (error) {
    console.error('Error fetching user from Firebase:', error);
    throw error;
  }
}
