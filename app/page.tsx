import React from 'react';
import dynamic from 'next/dynamic';
import { getTransformedDatasetMetadata } from 'app/content/utils/mdx';
import "app/styles/overrides.scss";
import fetchDatasetMetadata from './content/utils/apiUtils';
import { mergeDataset } from './content/utils/data';

const ExplorationAnalysis = dynamic(
  () => import('./(datasets)/exploration/exploration'),
  { 
    ssr: false,
    loading: () => <p>Loading...</p>
  },
);

export default function Page() {
  const datasets: any[] = getTransformedDatasetMetadata();
  const apiDataset = fetchDatasetMetadata();
  const mergedDatasets = mergeDataset(datasets, apiDataset);
  
  return (
    <section>
      <ExplorationAnalysis datasets={mergedDatasets} />
    </section>
  );
}
