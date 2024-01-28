import { ATHLETES_ENDPOINT } from '@/constants/endpoints';
import { fetchStravaApi } from '@/utils/fetchStravaApi';
import { getActivities } from '@/utils/getActivities';
import { getCommuneData } from '@/utils/getCommuneData';
import { getCommunesForActivity } from '@/utils/getCommunesForActivity';
import { getDecodedPolylines } from '@/utils/getDecodedPolylines';
import { AthleteStats } from '@/utils/types';
import { db } from '@/firebase';
import { collection, query, where, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import { getUser } from '@/utils/getUser';

export const saveUser = async (userId: number, additionalData?: { [x: string]: unknown }) => {
  const user = await getUser();

  const athleteStatsFromStrava = await fetchStravaApi<AthleteStats>({
    endpoint: `${ATHLETES_ENDPOINT}/${userId}/stats`,
  });

  if (!athleteStatsFromStrava) return;

  const numberOfActivities =
    athleteStatsFromStrava.all_run_totals?.count +
    athleteStatsFromStrava.all_ride_totals?.count +
    athleteStatsFromStrava.all_swim_totals?.count;

  if (!!user?.communes && user?.numberOfActivities === numberOfActivities) {
    return user.communes;
  }

  const activities = await getActivities({ userId, offsetEpoch: user?.timeOfLastActivity });

  if (!activities) return [];

  const latLongsOfAllActivities = getDecodedPolylines(activities);

  if (!latLongsOfAllActivities) return [];

  const existingCommunes = user?.communes || [];

  const communeData = getCommuneData();

  const allTimeCommunes = [];

  for (let index = 0; index < latLongsOfAllActivities.length; index++) {
    const communesForActivity = getCommunesForActivity(latLongsOfAllActivities[index], communeData);

    allTimeCommunes.push(communesForActivity);
  }

  const uniqueCommunes: string[] = Array.from(new Set([...allTimeCommunes.flat(), ...existingCommunes]));

  const newUserData = {
    communes: uniqueCommunes,
    id: userId,
    distance: athleteStatsFromStrava.all_ride_totals?.distance,
    numberOfActivities,
    numberOfCyclingActivities: athleteStatsFromStrava.all_ride_totals?.count,
    timeOfLastActivity: new Date(activities.at(-1)?.start_date || '').getTime(),
    ...additionalData,
  };

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
