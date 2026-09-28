import { publicPath, siteUrl } from '@/lib/site';
import type { Metadata, Viewport } from 'next';
import './globals.css';


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Sebastian Keltz | Electrical Engineering Student',
    template: '%s | Sebastian Keltz',
  },
  description:
    'Sebastian Keltz: UCF electrical engineering student, OurWay founder and developer, and Certified SOLIDWORKS Associate. Explore hardware and software projects, experience, and résumé.',
  icons: { icon: publicPath('/favicon.svg') },
  openGraph: {
    type: 'website',
    title: 'Sebastian Keltz | Electrical Engineering Student',
    description: 'Electrical engineering built in the real world—embedded systems, power, electric mobility, prototyping, and full-stack product development.',
    siteName: 'Sebastian Keltz Engineering Portfolio',
    images: [{ url: publicPath('/og-green.jpg'), width: 1200, height: 630, alt: 'Sebastian Keltz electrical engineering portfolio in a green technical editorial style' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sebastian Keltz | Electrical Engineering Student',
    description: 'Electrical engineering built in the real world—embedded systems, power, electric mobility, prototyping, and full-stack product development.',
    images: [publicPath('/og-green.jpg')],
  },
};

export const viewport: Viewport = {
  themeColor: '#0e1712',
  colorScheme: 'light',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Sebastian Keltz',
              url: siteUrl,
              affiliation: { '@type': 'CollegeOrUniversity', name: 'University of Central Florida' },
              sameAs: ['https://www.linkedin.com/in/sebastian-keltz-0ab141259/', 'https://github.com/SebastianKeltz'],
              knowsAbout: ['Electrical engineering', 'Embedded systems', 'Power electronics', 'Hardware prototyping', 'Software engineering', 'Full-stack product development'],
            }).replace(/</g, '\\u003c'),
          }}
        />
      </body>
    </html>
  );
}
