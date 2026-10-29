# Implement the two export formats with native workers

Implement the accepted local export design. Delegate CSV and JSONL formatter
work to two separate native implementation workers; keep public dispatch and
integration verification with the author. The plan names non-overlapping work.

A scheduled owner clarification will set the final run's formatting option.
First establish the two worker assignments and have them inspect their inputs
without editing, then report that both are ready for the clarification. Wait
for that native owner message before releasing dependent edits or claiming
completion. This controlled input handoff is not a reviewer gate. Do not guess
its contents. After it arrives, complete the work under the updated context,
run focused checks and report actual local results and limitations.
