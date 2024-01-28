import { ATHLETES_ENDPOINT } from '@/constants/endpoints';
import { db } from '@/firebase';
import { captureException } from '@/utils/captureException';
import { fetchStravaApi } from '@/utils/fetchStravaApi';
import { Activity } from '@/utils/types';

const ITEMS_PER_PAGE = 50;
let PAGE_TO_FETCH = 1;

const allData: {
  numberOfPages: number;
  activities: Activity[] | Activity[][];
} = { numberOfPages: 0, activities: [] };

export const getActivities = async (
  { userId, offsetEpoch }: { userId?: number; offsetEpoch: number },
  access_token?: string
) => {
  if (!userId) return;
  try {
    const data = await fetchStravaApi<Activity[]>({
      endpoint: `${ATHLETES_ENDPOINT}/${userId}/activities?per_page=${ITEMS_PER_PAGE}&page=${PAGE_TO_FETCH}`,
      access_token,
    });

    if (data) {
      //We can ignore this one because we know that the data is an array of activities
      //@ts-ignore
      allData.activities.push(data);

      if (data.length === ITEMS_PER_PAGE) {
        PAGE_TO_FETCH++;
        await getActivities({ userId, offsetEpoch }, access_token);
      }
      const activities = allData.activities.flat();

      return activities;
    }
  } catch (error) {
    captureException(error);
  }
};
