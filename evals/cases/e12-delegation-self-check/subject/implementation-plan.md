# Accepted local export implementation plan

| Task | Owner / writable scope | Depends on | Outcome / evidence |
| --- | --- | --- | --- |
| CSV | CSV worker: formatters/csv.mjs and csv.test.mjs | Scheduled owner clarification before edits | Correct quoted CSV under both supported option states; focused checks |
| JSONL | JSONL worker: formatters/jsonl.mjs and jsonl.test.mjs | Scheduled owner clarification before edits | Correct JSON Lines under both supported option states; focused checks |
| Integrate | Author: export.mjs, export.test.mjs, formatting.json | Both formatter implementations | Public dispatch behavior and selected run option verified against the contract |

Workers may read all governing local inputs and skills. They do not own each
other's files or shared authority. Alternative local verification techniques
are allowed; do not add a worker for trivial command execution. This supplied
plan authorizes the local task only, not review, merge or publication.
