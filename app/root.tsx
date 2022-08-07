import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import tailwind from './styles/globals.css';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Prose Markdown Sample',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: tailwind,
  },
];

type DocumentProps = {
  title?: string;
  children: React.ReactNode;
};
function Document({ title, children }: DocumentProps) {
  return (
    <html lang="ko" data-theme="light">
      <head>
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}
