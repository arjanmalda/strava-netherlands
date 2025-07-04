import { CardWithLink } from '@/components/Card';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Map } from '@/components/Map';
import { MaxWidth } from '@/components/MaxWidth';
import { getDecryptedAccessToken } from '@/utils/decryptTokens';
import { getUser } from '@/utils/getUser';
import Image from 'next/image';
import { Fragment } from 'react';

// eslint-disable-next-line react/function-component-definition
export default async function Home() {
  const user = await getUser();

  return (
    <Fragment>
      {!!user?.profile && (
        <MaxWidth>
          <div className="p-2">
            <Image height={100} width={100} src={user?.profile} alt="Profile" className="rounded-full" />
          </div>
        </MaxWidth>
      )}
      {!!user?.communes && (
        <div className="flex flex-col gap-2">
          <MaxWidth>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              <CardWithLink title="Cycling activities">
                <p>{user.numberOfCyclingActivities}</p>
              </CardWithLink>
              <CardWithLink title="Communes visited">
                <p>{user?.communes?.length} / 342</p>
              </CardWithLink>
              <CardWithLink title="Total cycling distance">
                <p>{Math.round(user?.distance ? user?.distance / 1000 : 0).toLocaleString('nl')} km</p>
              </CardWithLink>
            </div>
          </MaxWidth>
          <div className="w-screen [&>*]:w-screen ">
            <Map communes={user?.communes} zoom={6} center={{ lat: 51.75768172045945, lng: 5.864468842887792 }} />
          </div>
        </div>
      )}
    </Fragment>
  );
}
