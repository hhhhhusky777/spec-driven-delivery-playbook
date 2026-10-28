export const normalizeSku = sku => sku.trim().toLowerCase();

export function indexFirstBySku(catalog, normalize = normalizeSku) {
  const index = new Map();
  for (const entry of catalog) {
    const key = normalize(entry.sku);
    if (!index.has(key)) index.set(key, entry.label);
  }
  return index;
}
