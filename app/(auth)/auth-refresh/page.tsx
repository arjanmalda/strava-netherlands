import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/utils/tokens';
import { SaveCookies } from '@/components/SaveCookies';
import { refreshTokens } from '@/utils/refreshTokens';
import { redirect } from 'next/navigation';
import { hashTokens } from '../../../utils/hashTokens';
import { captureException } from '@/utils/captureException';

export const DEFAULT_ERROR_MESSAGE =
  'Er is een fout opgetreden bij het ophalen van de gebruikersgegevens. Probeer het later opnieuw.';

let error: string;

const Page = async ({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) => {
  const redirectUrl = searchParams?.redirect_url ? searchParams.redirect_url?.toString() : '/';
  try {
    const response = await refreshTokens();

    if (!response) {
      redirect('/login');
    }

    const { hashedAccessToken, hashedRefreshToken } = await hashTokens(response);

    return (
      <div>
        {error}
        <SaveCookies
          incomingCookies={[
            { key: ACCESS_TOKEN_KEY, value: hashedAccessToken },
            { key: REFRESH_TOKEN_KEY, value: hashedRefreshToken },
          ]}
          redirectUrl={redirectUrl}
        />
      </div>
    );
  } catch {
    error = DEFAULT_ERROR_MESSAGE;
    captureException('Error while fetching tokens in auth-refresh');
    redirect('/login');
  }
};

export default Page;
