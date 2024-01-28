import { getDecryptedAccessToken } from '@/utils/decryptTokens';
import { fetchStravaApi } from '@/utils/fetchStravaApi';
import { getActivities } from '@/utils/getActivities';
import { getCommuneData } from '@/utils/getCommuneData';
import { getDecodedPolylines } from '@/utils/getDecodedPolylines';
import { getUserFromFirebase } from '@/utils/getUserFromFirebase';
import { AthleteStats } from '@/utils/types';
import { updateUserInFirebase } from '@/utils/updateUserInFirebase';
import { getCommunesForActivity } from './getCommunesForActivity';
import { ATHLETES_ENDPOINT } from '@/constants/endpoints';

export const getUser = async () => {
  const userId = getDecryptedAccessToken()?.athlete_id;

  if (!userId) return;

  const user = await getUserFromFirebase(userId);

  return user;
};
