require('dotenv').config({ path: '.env.local' });
import { mapDrupalToMdxIds } from './mapping';

export async function getDrupalDatasets(): Promise<any[]> {
  const { NEXT_USE_DRUPAL_API, NEXT_DRUPAL_API_URL, NEXT_DRUPAL_USERNAME, NEXT_DRUPAL_PASSWORD,} = process.env;

  // If NEXT_USE_DRUPAL_API is not present at all → skip immediately
  if (NEXT_USE_DRUPAL_API === undefined) {
    return [];
  }

  // Convert to boolean (string-safe)
  const useDrupal = (NEXT_USE_DRUPAL_API || '').replace(/['"]/g, '').trim().toLowerCase() === 'true';

  // If explicitly false → skip
  if (!useDrupal) {
    //fall back to mdx
    return [];
  }

  // If enabled but missing URL → skip safely
  if (!NEXT_DRUPAL_API_URL) {
    console.warn("Missing NEXT_DRUPAL_API_URL — skipping Drupal fetch.");
    return [];
  }

  // Prepare headers (Auth optional)
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (NEXT_DRUPAL_USERNAME && NEXT_DRUPAL_PASSWORD) {
    headers.Authorization = `Basic ${Buffer.from(
      `${NEXT_DRUPAL_USERNAME}:${NEXT_DRUPAL_PASSWORD}`
    ).toString('base64')}`;
  }

  // Fetch data
  try {
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
