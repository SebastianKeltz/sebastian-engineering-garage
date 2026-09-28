import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

type PageFrameProps = Readonly<{
  children: React.ReactNode;
  compactFooter?: boolean;
  longForm?: boolean;
}>;

export function PageFrame({ children, compactFooter = false, longForm = false }: PageFrameProps) {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader showReadingTools={longForm} />
      <main id="main" tabIndex={-1}>{children}</main>
      <SiteFooter compact={compactFooter} />
    </>
  );
}
