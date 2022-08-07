import type { Item } from '~/utils/mdx.server';

export interface ItemCardProps {
  item: Item;
}

function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="card bg-base-300">
      <div className="card-body">
        <h5 className="card-title">{item.frontmatter.title}</h5>
        {item.frontmatter.description && <p>{item.frontmatter.description}</p>}
      </div>
    </div>
  );
}

export default ItemCard;
