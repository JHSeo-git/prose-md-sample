export type Item = {
  frontmatter?: {
    title?: string;
    date?: string;
    thumbnail?: string;
  };
  body: string;
};
