import type { ComponentPropsWithoutRef } from 'react';
import { publicPath } from '@/lib/site';

// Native navigation keeps every exported page directly loadable on GitHub Pages.
export default function SiteLink({ href, ...props }: ComponentPropsWithoutRef<'a'>) {
  if (href?.startsWith('/') && !href.startsWith('//')) {
    const [, pathname, suffix] = href.match(/^([^?#]*)(.*)$/)!;
    const pagePath = pathname.endsWith('/') ? pathname : `${pathname}/`;
    href = publicPath(`${pagePath}${suffix}`);
  }
  return <a {...props} href={href} />;
}
