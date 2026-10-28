import { normalizeSku } from './catalog-index.mjs';

export function resolveLabels(catalog, requested, normalize = normalizeSku) {
  return requested.map(sku => {
    const key = normalize(sku);
    const found = catalog.find(entry => normalize(entry.sku) === key);
    return found ? found.label : null;
  });
}
