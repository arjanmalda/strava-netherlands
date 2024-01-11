import { fetchStravaApi } from '@/utils/fetchStravaApi';
import { AthleteStats } from '@/utils/types';

export const getAthleteStats = async (userId: string) => {
  const response = await fetchStravaApi<AthleteStats>({
    endpoint: `https://www.strava.com/api/v3/athletes/${userId}/stats`,
    method: 'GET',
  });
};
