import { db } from '@/firebase';
import { communeOfCoordinate } from '@/utils/communeOfCoordinate';
import { getDecryptedAccessToken } from '@/utils/decryptTokens';
import { getActivities } from '@/utils/getActivities';
import { getCommuneData } from '@/utils/getCommuneData';
import { getDecodedPolylines } from '@/utils/getDecodedPolylines';
import { Activity } from '@/utils/types';
import { captureException } from '@sentry/nextjs';
import { addDoc, collection, doc, getDocs, query, where } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore/lite';

export const getCommunesVisited = async () => {
  const userId = getDecryptedAccessToken()?.athlete_id;

  const activities = await getActivities(userId);

  const latLongsOfAllActivities = getDecodedPolylines(activities);

  if (!latLongsOfAllActivities) return [];

  const communeData = getCommuneData();

  const allTimeCommunes = [];

  for (let index = 0; index < latLongsOfAllActivities.length; index++) {
    const communesForActivity = getCommunesForActivity(latLongsOfAllActivities[index], communeData);

    allTimeCommunes.push(communesForActivity);
  }

  const uniqueCommunes = Array.from(new Set(allTimeCommunes.flat()));

  storeCommunesVisitedInFirebase(uniqueCommunes, userId);

  return uniqueCommunes;
};

function getCommunesForActivity(
  activity: number[][],
  communeData: {
    boundaries: number[][];
    name: string;
  }[]
) {
  let communes: string[] = [];

  for (let index = 0; index < activity.length; index++) {
    const point = activity[index];
    if (index % 2 === 0) {
      const communeOfCurrentPoint = communeOfCoordinate(point, communeData) || '';

      communes.push(communeOfCurrentPoint);
    }
  }

  const uniqueCommunes = new Set(communes);

  return Array.from(uniqueCommunes).filter(Boolean);
}

export async function storeCommunesVisitedInFirebase(communes: string[], userId?: number) {
  try {
    console.log({ communes });

    const usersRef = collection(db, 'users');
    const q = userId ? query(usersRef, where('id', '==', userId.toString())) : undefined;
    const querySnapshot = q ? await getDocs(q) : undefined;

    if (!querySnapshot) return;
    if (!!querySnapshot && querySnapshot?.docs?.length === 0) {
      await addDoc(collection(db, 'users'), {
        id: userId,
        communes,
      });
    }

    if (!!querySnapshot && querySnapshot?.docs?.length > 0) {
      const userRef = doc(db, 'users', querySnapshot.docs[0].id);

      await updateDoc(userRef, {
        communes,
      });
    }
  } catch (error) {
    captureException(error);
  }
}
