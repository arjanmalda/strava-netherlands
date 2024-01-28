import { ATHLETES_ENDPOINT } from '@/constants/endpoints';
import { fetchStravaApi } from '@/utils/fetchStravaApi';
import { getActivities } from '@/utils/getActivities';
import { getCommuneData } from '@/utils/getCommuneData';
import { getCommunesForActivity } from '@/utils/getCommunesForActivity';
import { getDecodedPolylines } from '@/utils/getDecodedPolylines';
import { getUserFromFirebase } from '@/utils/getUserFromFirebase';
import { AthleteStats } from '@/utils/types';
import { updateUserInFirebase } from '@/utils/updateUserInFirebase';

export const saveUser = async (userId: number) => {
  const user = await getUserFromFirebase(userId);

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

  await updateUserInFirebase(userId, {
    communes: uniqueCommunes,
    id: userId,
    distance: athleteStatsFromStrava.all_ride_totals?.distance,
    numberOfActivities,
    numberOfCyclingActivities: athleteStatsFromStrava.all_ride_totals?.count,
    timeOfLastActivity: new Date(activities.at(-1)?.start_date || '').getTime(),
  });
};
