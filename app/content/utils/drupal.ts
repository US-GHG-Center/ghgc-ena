require('dotenv').config({ path: '.env.local' });
import { mapDrupalToMdxIds } from './mapping';

export async function getDrupalDatasets(): Promise<any[]> {
  const { NEXT_DRUPAL_API_URL, NEXT_DRUPAL_USERNAME, NEXT_DRUPAL_PASSWORD } = process.env;

  if (!NEXT_DRUPAL_API_URL) {
    console.warn('Missing DRUPAL_API_URL in .env.local — skipping Drupal fetch.');
    return [];
  }

  // Prepare headers (Auth optional)
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (NEXT_DRUPAL_USERNAME && NEXT_DRUPAL_PASSWORD) {
    const authHeader = `Basic ${Buffer.from(`${NEXT_DRUPAL_USERNAME}:${NEXT_DRUPAL_PASSWORD}`).toString('base64')}`;
    headers.Authorization = authHeader;
  }

  try {
    // Try fetching from Drupal (with or without credentials)
    const response = await fetch(NEXT_DRUPAL_API_URL, { headers });

    if (!response.ok) {
      console.warn(`Drupal fetch failed: ${response.status} ${response.statusText}`);
      return [];
    }

    const data: any[] = await response.json();
    const validNids = new Set(Object.keys(mapDrupalToMdxIds()));

    return data.filter((record: any) => validNids.has(String(record?.nid ?? '').trim()));

  } catch (error: any) {
    // Return an empty JSON array if an error occurs (fallback to MDX)
    return [];
  }
}
