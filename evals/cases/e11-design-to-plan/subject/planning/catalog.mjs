export function selectRows(records) {
  return records.filter(record => record.id !== '');
}

export function csv(rows) {
  const quote = value => `"${value.replaceAll('"', '""')}"`;
  return rows.map(row => [quote(row.id), quote(row.title)].join(',')).join('\n');
}

export function exportRows(format, records) {
  if (format !== 'csv') throw new RangeError('Unsupported format');
  return csv(selectRows(records));
}
