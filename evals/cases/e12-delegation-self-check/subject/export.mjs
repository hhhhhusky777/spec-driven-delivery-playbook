export function exportReport(format, rows, options) {
  if (!['csv', 'jsonl'].includes(format)) throw new RangeError('Unsupported format');
  throw new Error('Export integration not implemented');
}
