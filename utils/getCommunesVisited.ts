import { communeOfCoordinate } from '@/utils/communeOfCoordinate';
import { getDecryptedAccessToken } from '@/utils/decryptTokens';
import { fetchStravaApi } from '@/utils/fetchStravaApi';
import { getActivities } from '@/utils/getActivities';
import { getCommuneData } from '@/utils/getCommuneData';
import { getDecodedPolylines } from '@/utils/getDecodedPolylines';
import { getUserFromFirebase } from '@/utils/getUserFromFirebase';
import { AthleteStats } from '@/utils/types';
import { updateUserInFirebase } from '@/utils/updateUserInFirebase';

export const getCommunesVisited = async () => {
  const userId = getDecryptedAccessToken()?.athlete_id;

  if (!userId) return;

  const user = await getUserFromFirebase(userId);

  const athleteStatsFromStrava = await fetchStravaApi<AthleteStats>({
    endpoint: `https://www.strava.com/api/v3/athletes/${userId}/stats`,
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

  const uniqueCommunes = Array.from(new Set([...allTimeCommunes.flat(), ...existingCommunes]));

  await updateUserInFirebase(userId, {
    communes: uniqueCommunes,
    id: userId,
    numberOfActivities,
    timeOfLastActivity: new Date(activities.at(-1)?.start_date || '').getTime(),
  });

  return uniqueCommunes;
};

function getCommunesForActivity(
  activity: number[][] | [number, number],
  communeData: {
    boundaries: number[][];
    name: string;
  }[]
) {
  let communes: string[] = [];

  for (let index = 0; index < activity.length; index++) {
    const point = activity[index];
    if (index % 2 === 0 && Array.isArray(point)) {
      const communeOfCurrentPoint = communeOfCoordinate(point, communeData) || '';

      communes.push(communeOfCurrentPoint);
    }
  }

  const uniqueCommunes = new Set(communes);

  return Array.from(uniqueCommunes).filter(Boolean);
}
