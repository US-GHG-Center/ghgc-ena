import React from 'react';
import type { Metadata } from 'next';
import { baseUrl } from './sitemap';
import './styles/index.scss';
import '@teamimpact/veda-ui/lib/main.css';


export const metadata: Metadata = {
  metadataBase: new URL(baseUrl ?? ''),
  title: {
    default: 'Next.js VEDA Template Instance',
    template: '%s | Next.js VEDA Template Instance',
  },
  description: 'Next.js VEDA Template Instance.',
  openGraph: {
    title: 'Next.js VEDA Template Instance',
    description: 'Next.js VEDA Template Instance.',
    url: baseUrl,
    siteName: 'Next.js VEDA Template Instance',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link href='https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap' rel='stylesheet' />
      </head>
      <body>
        <div className='minh-viewport display-flex flex-column'>
          <main id='pagebody' className='flex-fill' tabIndex={-1}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
