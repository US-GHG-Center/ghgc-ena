import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import markdownit from 'markdown-it';
import { transformToDatasetsList, processTaxonomies } from './data';
import type {
  DatasetMetadata,
  ContentMetadata,
  DatasetWithContent,
  StoryWithContent,
  StoryMetadata,
} from 'app/types/content';

const STORY_CONTENT_PATH = path.join(
  process.cwd(),
  'app',
  'content',
  'stories',
);
const DATASET_CONTENT_PATH = path.join(
  process.cwd(),
  'app',
  'content',
  'datasets',
);

const md = markdownit();

function addBasepathToInternalLinks(obj) {
  const basepath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  if (!basepath || typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(addBasepathToInternalLinks);
  }

  const result = { ...obj };

  // Process all string values for internal links
  Object.keys(result).forEach((key) => {
    if (typeof result[key] === 'string') {
      // Handle markdown content with internal links
      result[key] = result[key].replace(
        /(?<![a-zA-Z0-9])\/([a-zA-Z0-9][a-zA-Z0-9\/\-_]*)/g,
        (match, url) => {
          // Only add basepath to internal links (not external URLs)
          if (
            url &&
            !url.startsWith('http') &&
            !url.startsWith('mailto:') &&
            !url.startsWith('tel:') &&
            !url.startsWith('#')
          ) {
            return `${basepath}/${url}`;
          }
          return match;
        },
      );
    } else if (typeof result[key] === 'object' && result[key] !== null) {
      result[key] = addBasepathToInternalLinks(result[key]);
    }
  });

  return result;
};

export function parseAttributes(obj) {
  const mdxData = {
    ...obj,
    ...(obj.layers
      ? {
          layers: obj.layers?.map((l) => ({
            ...l,
            parentDataset: { id: obj.id },
          })),
        }
      : {}),
  };
  const convert = (obj) => {
    return Object.keys(obj).reduce(
      (acc, key) => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          acc[key] = convert(obj[key]);
        } else if (typeof obj[key] === 'string') {
          if (obj[key].includes('::markdown')) {
            const v = obj[key];
            const p = v.replace(/^::markdown ?/, '');
            // Conver the string to HTML
            const parsedVal = md.render(p);
            acc[key] = parsedVal.replaceAll(/(\r\n|\n|\r)/gm, '');
            return acc;
          }

          if (obj[key].includes('::js')) {
            const v = obj[key];
            const p = v.replace(/^::js ?/, '').replaceAll('\\n', '\n');
            acc[key] = p;
            return acc;
          } else {
            acc[key] = obj[key];
          }
        } else {
          acc[key] = obj[key];
        }
        return acc;
      },
      Array.isArray(obj) ? [] : {},
    );
  };

  const processedData = convert(mdxData);
  return addBasepathToInternalLinks(processedData);
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const parsedData = matter(rawContent);
  return parsedData;
}

function getMDXData(dir): ContentMetadata[] {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { content, data } = readMDXFile(path.join(dir, file));
    const parsedData = parseAttributes(data);

    const processedData = processTaxonomies(parsedData);
    const slug = path.basename(file, path.extname(file));

    return {
      metadata: processedData,
      slug,
      content,
    };
  });
}

function getMDXMetaData(dir: string): ContentMetadata[] {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { data } = readMDXFile(path.join(dir, file));
    const parsedData = parseAttributes(data);
    const processedData = processTaxonomies(parsedData);
    const slug = path.basename(file, path.extname(file));
    return {
      metadata: processedData,
      slug,
    };
  });
}

export function getStoriesMetadata(): StoryMetadata[] {
  return getMDXMetaData(STORY_CONTENT_PATH) as StoryMetadata[];
}

export function getStories() {
  return getMDXData(STORY_CONTENT_PATH) as StoryWithContent[];
}

export function getDatasetsMetadata(): DatasetMetadata[] {
  return getMDXMetaData(DATASET_CONTENT_PATH) as DatasetMetadata[];
}

export function getDatasets(): DatasetWithContent[] {
  return getMDXData(DATASET_CONTENT_PATH) as DatasetWithContent[];
}

export function getTransformedDatasetMetadata() {
  return transformToDatasetsList(getDatasetsMetadata());
}

export function getTransformedDatasets() {
  return transformToDatasetsList(getDatasets());
}
