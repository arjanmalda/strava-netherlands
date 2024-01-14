import { db } from '@/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export async function getUserFromFirebase(userId: number) {
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
}
