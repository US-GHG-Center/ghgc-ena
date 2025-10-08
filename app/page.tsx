import React from 'react';
import dynamic from 'next/dynamic';
import { getTransformedDatasetMetadata } from 'app/content/utils/mdx';
import "app/styles/overrides.scss";
import fetchDatasetMetadata from './content/utils/apiUtils';
import { mergeDataset } from './content/utils/data';
import { getDrupalDatasets } from './content/utils/drupal';

const ExplorationAnalysis = dynamic(
  () => import('./(datasets)/exploration/exploration'),
  { 
    ssr: false,
    loading: () => <p>Loading...</p>
  },
);

export default async function Page() {
  const mdxDatasets: any[] = getTransformedDatasetMetadata();
  // const apiDataset = fetchDatasetMetadata(); // sample API response for mock
  const apiDataset = await getDrupalDatasets();
  

  const mergedDatasets = mergeDataset(mdxDatasets, apiDataset);
  
  return (
    <section>
      <ExplorationAnalysis datasets={mergedDatasets} />
    </section>
  );
}
