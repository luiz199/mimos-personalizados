'use client';
import type { Product } from './products';

const DB = 'mimos';
const COLLECTION = 'products';

function getConfig() {
  if (typeof window === 'undefined') return { url: '', key: '' };
  return {
    url: localStorage.getItem('mimos-cloud-url') || '',
    key: localStorage.getItem('mimos-cloud-key') || '',
  };
}

async function call(action: string, doc: Record<string, unknown>) {
  const { url, key } = getConfig();
  if (!url || !key) return null;
  try {
    const res = await fetch(`${url}/action/${action}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'api-key': key },
      body: JSON.stringify({ dataSource: DB, database: DB, collection: COLLECTION, ...doc }),
    });
    return res.ok ? res.json() : null;
  } catch { return null; }
}

export async function fetchProducts(): Promise<Product[] | null> {
  const data = await call('find', { filter: {} });
  return data?.documents || null;
}

export async function saveProduct(product: Product): Promise<boolean> {
  const data = await call('insertOne', { document: product });
  return !!data;
}

export async function updateProductMongo(id: string, updates: Partial<Product>): Promise<boolean> {
  const data = await call('updateOne', { filter: { id }, update: { $set: updates } });
  return !!data;
}

export async function deleteProductMongo(id: string): Promise<boolean> {
  const data = await call('deleteOne', { filter: { id } });
  return !!data;
}
