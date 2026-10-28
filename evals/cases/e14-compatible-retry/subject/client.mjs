let sequence = 0;

export async function submitOrder(store, { requestId, product, quantity = 1 }) {
  return store.putOnce(`${requestId}-${++sequence}`, { product, quantity });
}
