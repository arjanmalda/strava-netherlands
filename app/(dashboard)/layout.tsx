import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Fragment } from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <Fragment>
    <main className="flex flex-col gap-2 overflow-x-hidden">{children}</main>
    <Footer />
  </Fragment>
);

export default DashboardLayout;
