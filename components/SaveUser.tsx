'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { ProgressBar } from '@/components/ProgressBar';
import { ATHLETES_ENDPOINT } from '@/constants/endpoints';
import { fetchStravaApi } from '@/utils/fetchStravaApi';
import { getCommuneData } from '@/utils/getCommuneData';
import { getCommunesForActivity } from '@/utils/getCommunesForActivity';
import { getDecodedPolylines } from '@/utils/getDecodedPolylines';
import { Activity, AthleteStats } from '@/utils/types';
import { captureException } from '@/utils/captureException';

const ITEMS_PER_PAGE = 50;
let PAGE_TO_FETCH = 1;

interface SaveUserProps {
  access_token: string;
  userId: number;
  profilePicture?: string;
}

export const SaveUser = ({ access_token, userId, profilePicture }: SaveUserProps) => {
  const [totalNumberOfActivities, setTotalNumberOfActivities] = useState<number>();
  const [allActivities, setAllActivities] = useState<Activity[] | Activity[][] | undefined>([]);

  const onSaveUser = useCallback(async () => {
    const user = await fetch('/api/user').then((response) => response.json());

    const athleteStatsFromStrava = await fetchStravaApi<AthleteStats>({
      endpoint: `${ATHLETES_ENDPOINT}/${userId}/stats`,
      access_token,
    });

    if (!athleteStatsFromStrava) return;

    const numberOfActivities =
      athleteStatsFromStrava.all_run_totals?.count +
      athleteStatsFromStrava.all_ride_totals?.count +
      athleteStatsFromStrava.all_swim_totals?.count;

    setTotalNumberOfActivities(numberOfActivities);

    if (!!user?.communes && user?.numberOfActivities === numberOfActivities) {
      return user.communes;
    }

    const activities = await getActivities({ userId, offsetEpoch: user?.timeOfLastActivity }, access_token);

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
      profilePicture,
    };

    await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(newUserData),
    });
  }, [access_token, userId, profilePicture]);

  const getActivities = useCallback(
    async ({ userId, offsetEpoch }: { userId?: number; offsetEpoch: number }, access_token?: string) => {
      if (!userId) return;
      try {
        const data = await fetchStravaApi<Activity[]>({
          endpoint: `${ATHLETES_ENDPOINT}/${userId}/activities?per_page=${ITEMS_PER_PAGE}&page=${PAGE_TO_FETCH}`,
          access_token,
        });

        if (data) {
          //@ts-ignore
          setAllActivities((previous) => [...previous, data]);

          if (data.length === ITEMS_PER_PAGE) {
            PAGE_TO_FETCH++;
            await getActivities({ userId, offsetEpoch }, access_token);
          }
          const activities = allActivities?.flat();

          return activities;
        }
      } catch (error) {
        captureException(error);
      }
    },
    []
  );

  useEffect(() => {
    onSaveUser();
  }, []);
  console.log(totalNumberOfActivities);

  return (
    !!totalNumberOfActivities && (
      <ProgressBar currentStep={PAGE_TO_FETCH} totalSteps={totalNumberOfActivities / ITEMS_PER_PAGE} />
    )
  );
};
