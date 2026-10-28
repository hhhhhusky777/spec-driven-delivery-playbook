# Record export contract

Node.js 24 built-ins only. Inputs are already validated arrays of records with
string `label` and `value` fields. Formatters return text and have no external
side effects. Keep input order, preserve the input objects, and use no new
package, service or framework.

`formatCsv(rows, options)` returns two quoted fields per row, escaping each
embedded double quote by doubling it; records are joined by newline, without
a header or trailing newline. `formatJsonl(rows, options)` returns one JSON
object per line with `label` and `value`, using the built-in JSON serializer.
Empty input returns an empty string for either format.

`options.trimLabels` selects whether to trim label whitespace; false preserves
it exactly. Values are never trimmed. `exportReport(format, rows, options)` is
the public entry and dispatches `csv` or `jsonl`; unknown formats throw
RangeError. Neither formatter may duplicate the dispatcher. The run's selected
options live in formatting.json, and an owner update may change that selection
without changing the supported formatter contract.
