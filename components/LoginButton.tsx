import { ButtonLink } from '@/components/Button';

const STRAVA_BASE_URL = 'https://www.strava.com/oauth/authorize';
const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_REDIRECT_URI = process.env.STRAVA_REDIRECT_URI;
const STRAVA_SCOPE = 'activity:read_all,profile:read_all';

const url = `${STRAVA_BASE_URL}?client_id=${STRAVA_CLIENT_ID}&redirect_uri=${STRAVA_REDIRECT_URI}&response_type=code&scope=${STRAVA_SCOPE}&approval_prompt=auto`;

export const LoginButtton = () => (
  <ButtonLink icon="ArrowRightOnRectangleIcon" look="positive" href={url}>
    <span>Sign in</span>
  </ButtonLink>
);
