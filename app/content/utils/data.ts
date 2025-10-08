import type { DatasetData, StoryData, VedaData } from '@lib';
import type { DatasetMetadata, DatasetWithContent } from 'app/types/content';
import { mapDrupalToMdxIds } from 'app/content/utils/mapping';
import { getDrupalDatasets } from './drupal';
import { info } from 'console';


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
  const apiDataByMdxId = {};

  // iterate all drupal records and create a map of mdxid → drupal record
  /* Example:
  {
  "micasa-carbonflux-grid-v1": { nid: "67", title: "...", ... },
  "blackmarble-radiance-daygrid-v2nrt": { nid: "111", title: "...", ... },
  }
  */

  for (const apiDataSet of apiData) {
    const mdxId = idMap?.[apiDataSet?.nid];
    if (mdxId) apiDataByMdxId[mdxId] = apiDataSet;
  }

  return mdxData.map((mdxDataSet: any) => {
    const apiDataSet = apiDataByMdxId[mdxDataSet.id];
    if (!apiDataSet) return mdxDataSet;

      return {
        ...mdxDataSet,
        ...apiDataSet,
        // Mapping the corresonding fields that are accepted by the DataLayers to be rendered
        name: apiDataSet.title,
        description: apiDataSet.summary,
        infoDescription: getInfoDescription(apiDataSet),
        taxonomy : mdxDataSet.taxonomy , // Populate taxonomy fields from API's subfields, gas, scale, sectors, topics
        // taxonomy :  //TBD: Populate taxonomy fields from API's subfields, gas, scale, sectors, topics
        layers: mdxDataSet.layers || [],
        
      };
    }
    )
  }

  // Helper function to format infoDescription from API data
  function getInfoDescription(apiDataSet = {}) {
    const fields = [
      { label: 'Temporal Extent', key: 'temporal_extent' },
      { label: 'Temporal Resolution', key: 'temporal_resolution' },
      { label: 'Spatial Extent', key: 'spatial_extent' },
      { label: 'Spatial Resolution', key: 'spatial_resolution' },
      { label: 'Data Units', key: 'data_units' },
      { label: 'Data Type', key: 'data_type' },
      { label: 'Data Tools', key: 'data_tools' },
      { label: 'Data License', key: 'data_license' },
    ];

    const listItems = fields
      .filter(({ key }) => Object.prototype.hasOwnProperty.call(apiDataSet, key))
      .map(({ label, key }) => `<li>${label}: ${apiDataSet[key]}</li>`)
      .join('\n');

    return `<ul>\n${listItems}\n</ul>`;
  }

