import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/utils/tokens';
import { SaveCookies } from '@/components/SaveCookies';
import { hashTokens } from '@/utils/hashTokens';
import { captureException } from '@/utils/captureException';
import { LoadingScreen } from '@/components/LoadingScreen';
import { saveUser } from '@/utils/saveUser';

const DEFAULT_ERROR_MESSAGE =
  'Er is een fout opgetreden bij het ophalen van de gebruikersgegevens. Probeer het later opnieuw.';

let error: string;

const Page = async ({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) => {
  if (!searchParams?.code) {
    throw new Error('No code provided');
  }

  try {
    const response = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code: searchParams?.code,
        grant_type: 'authorization_code',
      }),
    });

    const json: {
      expires_at?: number;
      access_token?: string;
      refresh_token?: string;
      athlete?: { id: number; profile?: string };
    } = await response.json();

    const { expires_at, access_token, refresh_token, athlete } = json;

    const { hashedAccessToken, hashedRefreshToken } = await hashTokens({
      access_token,
      expires_at,
      refresh_token,
      athlete_id: athlete?.id,
    });

    if (athlete?.id) {
      await saveUser(athlete?.id, { profilePicture: athlete?.profile });
    }

    return (
      <div>
        {error}
        <SaveCookies
          incomingCookies={[
            { key: ACCESS_TOKEN_KEY, value: hashedAccessToken },
            { key: REFRESH_TOKEN_KEY, value: hashedRefreshToken },
          ]}
          redirectUrl={'/'}
        />
      </div>
    );
  } catch {
    captureException('Error while fetching tokens in auth-redirect');
    error = DEFAULT_ERROR_MESSAGE;
  }
};

export default Page;
