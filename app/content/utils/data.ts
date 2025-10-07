import type { DatasetData, StoryData, VedaData } from '@lib';
import type { DatasetMetadata, DatasetWithContent } from 'app/types/content';
import { mapDrupalToMdxIds } from 'app/content/utils/mapping';
import { getDrupalDatasets } from './drupal';


// Printing the response for now, will remove later and connect to the merge function after finalizing the transformation logic for fields in drupal and mdx
(async () => {
  const drupalData = await getDrupalDatasets();
  console.log('Drupal data:', JSON.stringify(drupalData, null, 2));
})();

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
        // Mapping the corresonding fields that are accepted by the DataLayers to be rendered
        name: apiDataSet.title,
        description: apiDataSet.summary,
        infoDescription: {
            temporal_extent: apiDataSet.temporal_extent ?? null,
            temporal_resolution: apiDataSet.temporal_resolution ?? null,
            spatial_extent: apiDataSet.spatial_extent ?? null,
            spatial_resolution: apiDataSet.spatial_resolution ?? null,
            data_units: apiDataSet.data_units ?? null,
            data_type: apiDataSet.data_type ?? null,
            data_latency: apiDataSet.data_latency ?? null,
            data_tools: apiDataSet.data_tools ?? null,
          },
        taxonomy : mdxDataSet.taxonomy , // Populate taxonomy fields from API's subfields, gas, scale, sectors, topics
        
        // taxonomy :  //TBD: Populate taxonomy fields from API's subfields, gas, scale, sectors, topics
        layers: mdxDataSet.layers || [],
        
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