import React from 'react';
import dynamic from 'next/dynamic';
import { getTransformedDatasetMetadata } from 'app/content/utils/mdx';
import "app/styles/overrides.scss";

const ExplorationAnalysis = dynamic(
  () => import('./(datasets)/exploration/exploration'),
  { 
    ssr: false,
    loading: () => <p>Loading...</p>
  },
);

export default function Page() {
  const datasets: any[] = getTransformedDatasetMetadata();
  return (
    <section>
      <ExplorationAnalysis datasets={datasets} />
    </section>
  );
}
