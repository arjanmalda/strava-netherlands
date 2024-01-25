import Link from 'next/link';
import React from 'react';

interface TabProps {
  label: string;
  isActive: boolean;
  url: string;
}

interface TabsProps {
  tabs: TabProps[];
}

export const Tabs = ({ tabs }: TabsProps) => {
  return (
    <div className="flex w-full justify-center">
      <div className="rounded-xl overflow-hidden">
        {tabs.map((tab, index) => (
          <Link
            key={index}
            href={tab.url}
            className={`px-4 py-2 ${tab.isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
