import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Fragment } from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <Fragment>
    <Header />
    <main className="flex-1 p-6">{children}</main>
    <Footer />
  </Fragment>
);

export default DashboardLayout;
