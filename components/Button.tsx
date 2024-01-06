import { HeroIcon } from '@/components/HeroIcon';
import { IconType } from '@/utils/types';
import Link from 'next/link';
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

const SHARED_CLASSES = `px-3 py-1.5 text-sm no-underline flex items-center gap-2.5 rounded-lg transition-colors w-fit [&_svg]:h-4`;
interface SharedProperties {
  icon?: IconType;
  look?: 'primary' | 'secondary' | 'tertiary' | 'positive';
  reverse?: boolean;
  discrete?: boolean;
}

export interface ButtonLinkProperties
  extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
    SharedProperties {
  href: string;
  targetBlank?: boolean;
}

export interface ButtonProperties
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    SharedProperties {
  type?: 'button' | 'submit' | 'reset';
}

export const ButtonLink = ({ icon, look = 'primary', children, href, reverse, targetBlank }: ButtonLinkProperties) => (
  <Link
    href={href}
    className={`${SHARED_CLASSES} ${getButtonStyle(look)} ${reverse ? 'flex-row-reverse' : 'flex-row'}`}
    target={targetBlank ? 'blank' : undefined}>
    {!!children && <span>{children}</span>}
    {!!icon && <HeroIcon icon={icon} />}
  </Link>
);

export const Button = ({ icon, look = 'primary', children, reverse, type, ...rest }: ButtonProperties) => (
  <button
    type={type === 'submit' ? 'submit' : type === 'reset' ? 'reset' : 'button'}
    className={`${SHARED_CLASSES} ${getButtonStyle(look)} ${reverse ? 'flex-row-reverse' : 'flex-row'}`}
    {...rest}>
    {!!children && <span>{children}</span>}
    {!!icon && <HeroIcon icon={icon} />}
  </button>
);

function getButtonStyle(look: SharedProperties['look']) {
  switch (look) {
    case 'secondary': {
      return 'bg-transparent border border-red-100 hover:bg-gray-20 focus:bg-red-50 text-gray-950 [&_svg]:stroke-gray-950';
    }
    case 'tertiary': {
      return ' text-xs color-950 [&_svg]:stroke-gray-950';
    }
    case 'positive': {
      return 'bg-green-300 hover:bg-green-200 focus:bg-green-200 text-white';
    }
    default: {
      return 'text-white bg-red-100 hover:bg-red-200 focus:bg-red-200 [&>span]:whitespace-nowrap';
    }
  }
}
