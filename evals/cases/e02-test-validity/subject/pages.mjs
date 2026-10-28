export function nextPage(offset, limit, total) { return offset + limit <= total ? offset + limit : null; }
