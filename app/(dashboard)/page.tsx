import { LoadingScreen } from '@/components/LoadingScreen';
import { Map } from '@/components/Map';
import { Tabs } from '@/components/Tabs';
import { VerticalMargin } from '@/components/VerticalMargin';
import { getUser } from '@/utils/getUser';
import Image from 'next/image';

// eslint-disable-next-line react/function-component-definition
export default async function Home() {
  const user = await getUser();

  console.log(user);

  return (
    <div>
      <Tabs
        tabs={[
          { url: '/', label: 'Dashboard', isActive: true },
          { url: '/vrienden', label: 'Vrienden', isActive: false },
        ]}
      />
      <VerticalMargin />
      <div className="p-2">
        {/* <Image height={100} width={100} src={user?.profile} alt="Profile" className="rounded-full" /> */}
      </div>
      {/* {!!communes && <Map communes={communes} zoom={6} center={{ lat: 51.75768172045945, lng: 5.864468842887792 }} />} */}
    </div>
  );
}
