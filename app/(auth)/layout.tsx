import { Header } from '@/components/Header';
import { Fragment } from 'react';

// eslint-disable-next-line react/function-component-definition
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <Header />
      <main className="p-6">{children}</main>
    </Fragment>
  );
}
