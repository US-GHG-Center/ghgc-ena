import type { DatasetData, StoryData, VedaData } from '@lib';
import type { DatasetMetadata, DatasetWithContent } from 'app/types/content';

export function processTaxonomies(data): DatasetData | StoryData {
  const updatedTax = data.taxonomy.map((t) => {
    const updatedVals = t.values.map((v) => {
      return {
        id: v.replace(/ /g, '_').toLowerCase(),
        name: v,
      };
    });
    return { ...t, values: updatedVals };
  });
  return { ...data, taxonomy: updatedTax };
}

export const transformToDatasetsList = (
  content: DatasetMetadata[],
): DatasetData[] => {
  return content?.map((post) => ({
    ...post.metadata,
  }));
};

export const transformToVedaData = (
  datasets: DatasetMetadata[] | undefined,
): VedaData<DatasetData> => {
  const transformed = {};
  datasets?.map((dataset) => {
    const id = dataset.metadata.id;
    transformed[id] = {
      data: dataset.metadata,
    };
  });
  return transformed;
};

export const mergeDataset = (
  mdxData: any[],
  apiData: any[],
): any[] => {
  // Both contains a list of datasets with "frontmatter" -> "id" field.
  // Fetch layers from mdxData and merge with apiData based on id.
  // [ {"frontmatter": { id: "dataset-1", title: "Dataset 1", ...}, ...}, {...} ]
  console.log(`MDX Data: ${mdxData}`);

  const mdxDataMap = new Map(mdxData.map((d) => [d.id, d]));
  
  const mergedData = apiData.map((apiDataSet) => {
    const mdxDataSet = mdxDataMap.get(apiDataSet.id);

    if (mdxDataSet) {
      return {
        ...mdxDataSet,
        ...apiDataSet,
        layers: mdxDataSet.layers || [],
      };
    }
    return mdxDataSet;
  }
  );

  // Fetch any datasets that are only in mdxData but not in apiData
  mdxData.forEach((mdxDataSet) => {
    if (!apiData.find((apiDataSet) => apiDataSet.id === mdxDataSet.id)) {
      mergedData.push(mdxDataSet);
    }
  });

  return mergedData;
}