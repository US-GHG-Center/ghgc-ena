'use client';
import React from 'react';
import Link from 'next/link';
import { VedaUIProvider } from '@lib';

export default function VedaUIConfigProvider({ children }: { children: any }) {
  return (
    <VedaUIProvider
      config={{
        envMapboxToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '',
        envApiStacEndpoint: process.env.NEXT_PUBLIC_API_STAC_ENDPOINT ?? '',
        envApiRasterEndpoint: process.env.NEXT_PUBLIC_API_RASTER_ENDPOINT ?? '',
        envUrlShortenerEndpoint: process.env.API_URL_SHORTENER_ENDPOINT ?? '',
        geoDataPath: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/public/geo-data`,
        navigation: {
          LinkComponent: Link,
          linkProps: {
            pathAttributeKeyName: 'href',
          },
        },
      }}
    >
      {children}
    </VedaUIProvider>
  );
}
