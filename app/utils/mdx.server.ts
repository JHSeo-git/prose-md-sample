import { bundleMDX } from 'mdx-bundler';
import slugify from 'cjk-slug';
import fs from 'fs/promises';
import path from 'path';

export const ITEMS_PATH = path.join(process.cwd(), '__data');

export const getFilePaths = async () => {
  const paths = await fs.readdir(ITEMS_PATH);
  const filePaths = paths.filter((path) => /\.mdx?$/.test(path));

  return filePaths;
};

export const getBundleMdxs = async () => {
  const filePaths = await getFilePaths();
  const mdxs = await Promise.all(
    filePaths.map(async (filePath) => {
      const mdx = await bundleMDX<Frontmatter>({
        file: path.join(ITEMS_PATH, filePath),
      });

      const { matter, errors, ...serialized } = mdx;

      return {
        ...serialized,
        id: filePath,
        slug: getSlug(mdx.frontmatter.title),
      };
    })
  );

  return mdxs;
};

export const getBundleMdxBySlug = async (slug: string) => {
  const mdxs = await getBundleMdxs();
  const mdx = mdxs.find((mdx) => mdx.slug === slug);

  if (!mdx) {
    throw new Error(`No mdx found for slug: ${slug}`);
  }

  return mdx;
};

export const getSlug = (text: string) => slugify(text);

export type Frontmatter = {
  title: string;
  date?: string;
  thumbnail?: string;
  description?: string;
};

export type Item = Awaited<ReturnType<typeof getBundleMdxBySlug>>;
