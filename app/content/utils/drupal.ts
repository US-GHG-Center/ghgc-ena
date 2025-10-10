require('dotenv').config({ path: '.env.local' });
import { mapDrupalToMdxIds } from './mapping';

export async function getDrupalDatasets(): Promise<any[]> {
  const { DRUPAL_API_URL, DRUPAL_USERNAME, DRUPAL_PASSWORD } = process.env;

  if (!DRUPAL_API_URL || !DRUPAL_USERNAME || !DRUPAL_PASSWORD)
    throw new Error('Missing DRUPAL_* environment variables in .env.local');

  const authHeader = `Basic ${Buffer.from(`${DRUPAL_USERNAME}:${DRUPAL_PASSWORD}`).toString('base64')}`;
  
  try {
    const response = await fetch(DRUPAL_API_URL, {
      headers: { Authorization: authHeader, Accept: 'application/json' },
    });

    if (!response.ok)
      throw new Error(`Drupal fetch failed: ${response.status} ${response.statusText}`);

    const data: any[] = await response.json();
    const validNids = new Set(Object.keys(mapDrupalToMdxIds()));

    return data.filter((record: any) => validNids.has(String(record.nid).trim()));
  } catch (error) {
    // Log the error
    console.error('Error fetching Drupal datasets:', error.message);
    
    // Return an empty JSON array if an error occurs
    return [];
  }
}
