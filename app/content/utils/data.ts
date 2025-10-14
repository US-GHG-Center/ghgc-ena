import type { DatasetData, StoryData, VedaData } from '@lib';
import type { DatasetMetadata, DatasetWithContent } from 'app/types/content';
import { mapDrupalToMdxIds } from './mapping';
import { info } from 'console';

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
  apiData: any[]
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
    const apiTaxonomy = apiDataSet ? buildDrupalTaxonomy(apiDataSet) : [];
      return {
        ...mdxDataSet,
        ...apiDataSet,
        // Mapping the corresonding fields that are accepted by the DataLayers to be rendered
        name: apiDataSet.title,
        description: apiDataSet.summary,
        infoDescription: getInfoDescription(apiDataSet),
        taxonomy : apiTaxonomy,//Populate taxonomy fields from API's subfields, gas, scale, sectors, topics
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
      { label: 'Data License', key: 'data_license' },
    ];

    const listItems = fields
      .filter(({ key }) => Object.prototype.hasOwnProperty.call(apiDataSet, key))
      .map(({ label, key }) => `<li>${label}: ${apiDataSet[key]}</li>`)
      .join('\n');

    return `<ul>\n${listItems}\n</ul>`;
  }

// Helper: extract anchor text from HTML or comma-separated string 
function extractLinksFromHtml(htmlString: string): { id: string; name: string }[] {
  if (!htmlString) return [];

  const regex = /<a[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi;
  const results: { id: string; name: string }[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(htmlString)) !== null) {
    const href = match[1];
    const name = match[2]?.trim() ?? '';

    // Extract the last path segment as ID (slug)
    const id = href.split('/').filter(Boolean).pop() || name.toLowerCase().replace(/\s+/g, '_');
    results.push({ id, name });
  }

  return results;
}

export function buildDrupalTaxonomy(drupalData: any) {
  // Only include topics, sectors, scale, and gas
  const fields = [
    { key: 'topics', label: 'Topics' },
    { key: 'gas', label: 'Gas' },
    { key: 'scale', label: 'Scale' },
    { key: 'sectors', label: 'Sectors' },    
  ];

  const taxonomy = fields.map(({ key, label }) => {
    // Only extract values if they exist in drupalData
    const values = drupalData[key] ? extractLinksFromHtml(drupalData[key]) : [];
    return {
      name: label,
      values, // already [{ id, name }]
    };
  });
  //filter out empty ones
  return taxonomy.filter((t) => t.values.length > 0);
}