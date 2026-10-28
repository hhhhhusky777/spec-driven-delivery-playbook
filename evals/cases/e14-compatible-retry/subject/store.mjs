export function createStore({ afterCommit = async () => {} } = {}) {
  const records = new Map();
  return {
    get writeCount() { return records.size; },
    async putOnce(requestId, payload) {
      const existing = records.get(requestId);
      if (existing) {
        if (existing.product !== payload.product || existing.quantity !== payload.quantity) {
          throw Object.assign(new Error('Request ID already owns another payload'), { code: 'KEY_REUSE' });
        }
        return { ...existing };
      }
      const receipt = { id: `order-${records.size + 1}`, ...payload };
      records.set(requestId, receipt);
      await afterCommit(receipt);
      return { ...receipt };
    },
  };
}
