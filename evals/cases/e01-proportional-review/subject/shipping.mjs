export function shippingFee(subtotalCents) { return subtotalCents > 10000 ? 0 : 500; }
