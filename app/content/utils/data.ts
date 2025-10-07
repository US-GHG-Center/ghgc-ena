import type { DatasetData, StoryData, VedaData } from '@lib';
import type { DatasetMetadata, DatasetWithContent } from 'app/types/content';
import { mapDrupalToMdxIds } from 'app/content/utils/mapping';

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


// Merge Drupal API data with MDX dataset based on ID
export const mergeDataset = (
  mdxData: any[],
  apiData: any[],
): any[] => {
  const idMap = mapDrupalToMdxIds(); // drupal nid → mdx id
  const mdxDataMap = new Map(mdxData.map((d) => [d.id, d]));
  const usedMdxIds = new Set<string>(); // track used mdx ids

  const mergedData = apiData.map((apiDataSet) => {
    const mappedID = idMap[apiDataSet.nid];
    const mdxDataSet = mdxDataMap.get(mappedID);

    if (mdxDataSet) {
      usedMdxIds.add(mdxDataSet.id);
      return {
        ...apiDataSet,
        layers: mdxDataSet.layers || [],
        // taxonomy : mdxDataSet.taxonomy || [], TODO: Replace this with subtaxonomy fields from drupal API
      };
    }
    return mdxDataSet;
  }
  );

  // Fetch any datasets that are only in mdxData but not in Drupal API Data
  mdxData.forEach((mdxDataSet) => {
    if (!usedMdxIds.has(mdxDataSet.id)) {
      mergedData.push(mdxDataSet);
    }
  });

  return mergedData;
}