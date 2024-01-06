import { HeroIcon } from '@/components/HeroIcon';
import { Logo } from '@/components/Logo';
import Link from 'next/link';

export const Header = () => (
  <div className="sticky top-0 flex justify-between border-b bg-white px-6 py-5 backdrop-blur-lg  before:inline-flex  before:w-6 before:flex-auto dark:border-b-gray-500/30 dark:bg-black/75 dark:text-white/75">
    <Link href="/" className="flex flex-grow">
      <Logo />
    </Link>
    <Link href="/profile" className="flex  flex-col items-center  justify-end gap-1 self-end text-slate-500">
      <HeroIcon icon="UserCircleIcon" />
    </Link>
  </div>
);
