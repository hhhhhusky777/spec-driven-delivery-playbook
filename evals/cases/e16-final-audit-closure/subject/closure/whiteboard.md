# Upload limit design

State: CONCLUDED
Owner accepted: fixture owner

## Design

D01: Accept uploads up to and including 5 MiB (5242880 bytes); reject larger
uploads. Keep image/png and image/jpeg only. No network or persistence change.

```mermaid
flowchart LR
  A[Validated upload size] --> B{bytes <= 5242880?}
  B -->|Yes| C[Accept]
  B -->|No| D[Reject]
```

## Canonical authority updates

D01 updates policies/upload.json from max_bytes 4194304 to 5242880.
Keep the existing MIME types. Future design and code must consume this authority.

## Design decisions

No new error type, endpoint, persistence or recovery behavior.
