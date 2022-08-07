import { Outlet } from '@remix-run/react';
import Layout from '~/components/Layout';

export default function LayoutRoute() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
