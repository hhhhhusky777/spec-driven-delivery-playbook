# Reduce repeated lookup work

Repeated catalog scans spend avoidable normalization work when many requested
SKUs reuse one catalog. Improve `resolveLabels` within CONTRACT.md. Research
relevant JavaScript/runtime behavior, compare the current implementation and a
suitable existing option using a controlled local workload, and preserve focused
regression evidence. Report measured work, the selected approach and limits.

Operation counts are sufficient; no fixed time or speedup ratio is required.
Do not claim production performance from this local exercise. Complete locally
without PR, deployment or new dependencies.
