# SGLang API-Key Redaction Delivery Example

This non-authoritative example applies the current playbook to public
[SGLang issue #37457](https://github.com/sgl-project/sglang/issues/37457).
The issue reports that resolved server arguments expose API credentials through
startup logs and server-information responses at SGLang commit
`9a05b470fa849b349e384ef3c1381f9a85c6c550`.

The packet demonstrates the future-need workflow after project adoption:

1. [concluded solution whiteboard](01-solution-whiteboard.md);
2. [reviewed workflow handoff](02-whiteboard-handoff.md);
3. [delivery workflow and artifact routing](03-delivery-workflow.md); and
4. [full implementation plan](04-implementation-plan.md).

It uses the latest playbook controls: evidence-backed policy reuse,
fail-closed review modes, transitive freshness, task context receipts,
smallest self-contained increments, and mandatory feature integration for a
two-task delivery.

No SGLang file was changed, no test result is claimed, and no SGLang reviewer
approved this design. The example stops in `CONTRACT_REVIEW`; repository owners
must resolve its recorded unknowns before any implementation could become
`READY`.
