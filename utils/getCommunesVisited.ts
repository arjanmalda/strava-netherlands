import { communeOfCoordinate } from '@/utils/communeOfCoordinate';
import { getDecryptedAccessToken } from '@/utils/decryptTokens';
import { getActivities } from '@/utils/getActivities';
import { getCommuneData } from '@/utils/getCommuneData';
import { getDecodedPolylines } from '@/utils/getDecodedPolylines';
import { getUserFromFirebase } from '@/utils/getUserFromFirebase';
import { updateUserInFirebase } from '@/utils/updateUserInFirebase';

export const getCommunesVisited = async () => {
  const userId = getDecryptedAccessToken()?.athlete_id;

  if (!userId) return;

  const user = await getUserFromFirebase(userId);

  if (user?.communes) {
    return user.communes;
  }

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

  await updateUserInFirebase(userId, { communes: uniqueCommunes, id: userId });

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
