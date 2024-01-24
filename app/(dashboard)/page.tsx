import { Map } from '@/components/Map';
import { getCommunesVisited } from '@/utils/getCommunesVisited';

// eslint-disable-next-line react/function-component-definition
export default async function Home() {
  const communes = await getCommunesVisited();

  console.log(JSON.stringify(communes, null, 2));

  return (
    <div>
      {!!communes && <Map communes={communes} zoom={6} center={{ lat: 51.75768172045945, lng: 5.864468842887792 }} />}
    </div>
  );
}
