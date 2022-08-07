import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import { getBundleMdxBySlug } from '~/utils/mdx.server';

export const loader = async ({ params }: LoaderArgs) => {
  const { slug } = params;

  if (typeof slug !== 'string') {
    return redirect('/items');
  }

  const item = await getBundleMdxBySlug(slug);

  return json({ item });
};

export interface ItemRouteProps {}

function ItemRoute(props: ItemRouteProps) {
  const { item } = useLoaderData<typeof loader>();
  const Component = useMemo(() => getMDXComponent(item.code), [item.code]);

  return (
    <div className="prose">
      <Component />
    </div>
  );
}

export default ItemRoute;
