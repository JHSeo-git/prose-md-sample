import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import ItemCard from '~/components/ItemCard';
import { getBundleMdxs } from '~/utils/mdx.server';

export const loader = async (args: LoaderArgs) => {
  const items = await getBundleMdxs();

  return json({ items });
};

export interface indexProps {}

export default function ItemsRoute(props: indexProps) {
  const { items } = useLoaderData<typeof loader>();

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} className="my-8">
          <Link to={`/items/${item.slug}`}>
            <ItemCard item={item} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
