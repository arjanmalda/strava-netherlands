import { ATHLETES_ENDPOINT } from '@/constants/endpoints';
import { fetchStravaApi } from '@/utils/fetchStravaApi';
import { AthleteStats } from '@/utils/types';

export const getAthleteStats = async (userId: string) => {
  const response = await fetchStravaApi<AthleteStats>({
    endpoint: `${ATHLETES_ENDPOINT}/${userId}/stats`,
    method: 'GET',
  });
};
