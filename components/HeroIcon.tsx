import { IconType } from '@/utils/types';
import dynamic from 'next/dynamic';

type HeroIconProperties = {
  icon: IconType;
  outlineStyle?: 'solid' | 'outline';
};

export const HeroIcon = ({ icon, outlineStyle = 'solid' }: HeroIconProperties) => {
  let Icon;
  if (outlineStyle === 'outline') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    Icon = dynamic(() => import('@heroicons/react/24/outline').then((module_) => module_[icon]));
  }

  if (outlineStyle === 'solid') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    Icon = dynamic(() => import('@heroicons/react/24/solid').then((module_) => module_[icon]));
  }
  // eslint-disable-next-line unicorn/no-null
  return Icon ? <Icon /> : null;
};
