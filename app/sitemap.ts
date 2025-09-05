import { getDatasetsMetadata, getStoriesMetadata } from 'app/content/utils/mdx';

export const baseUrl = process.env.DOMAIN_PROD;
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

import {
  DATASET_CATALOG_PATH,
  EXPLORATION_PATH,
  STORY_HUB_PATH,
} from './config';

const additionalRoutes = ['about'];

export default async function sitemap() {
  const datasets = getDatasetsMetadata().map((post) => ({
    url: `${baseUrl}${basePath}/${DATASET_CATALOG_PATH}/${post.slug}`,
  }));

  const stories = getStoriesMetadata().map((post) => ({
    url: `${baseUrl}${basePath}/${STORY_HUB_PATH}/${post.slug}`,
    lastModified: post.metadata.pubDate,
  }));

  const routes = [
    '',
    DATASET_CATALOG_PATH,
    EXPLORATION_PATH,
    STORY_HUB_PATH,
    ...additionalRoutes,
  ].map((route) => ({
    url: `${baseUrl}${basePath}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...datasets, ...stories];
}
