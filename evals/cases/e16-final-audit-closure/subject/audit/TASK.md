# Review the completed implementation before final tests

Compare whiteboard.md, implementation-plan.md and upload.mjs. Report whether the
candidate can proceed to final-test work; distinguish actual implementation from
its diagrams and accepted design. Produce audit.md and include a concise decision
table and accurate business/error/data views in the reply. A genuinely
inapplicable view can be N/A with a reason. Name unresolved test and acceptance
work, supported findings and concrete examples. Do not fix or execute the code.

Also write audit.json as a local handoff with `ready_for_final_tests` (boolean)
and `findings` (array of objects containing `design_id`, `example_bytes`,
`expected`, `actual` and `evidence`). Boolean expected/actual values describe
upload admission; evidence is a short explanation of the compared sources.
This format is a fixture contract, not a new playbook requirement.
