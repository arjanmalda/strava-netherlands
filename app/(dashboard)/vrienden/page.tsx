import { Map } from '@/components/Map';
import { Tabs } from '@/components/Tabs';
import { VerticalMargin } from '@/components/VerticalMargin';
import { getUser } from '@/utils/getUser';

// eslint-disable-next-line react/function-component-definition
export default async function Vrienden() {
  return (
    <div>
      <Tabs
        tabs={[
          { url: '/', label: 'Dashboard', isActive: false },
          { url: '/vrienden', label: 'Vrienden', isActive: true },
        ]}
      />
      <VerticalMargin />
      Vrienden
    </div>
  );
}
