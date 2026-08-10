---
type: "roadmap"
epic_name: "BRUTAL UI & BACKEND FULL-STACK INTEGRATION"
domain: "Full-Stack"
complexity_aggregate: "MEDIUM"
---

EPIC 1: BOOTSTRAP & ENVIRONMENT INITIALIZATION | ISOLATED VERTICAL

Story 1.0: Roadmap & Planning Initialization | [MoSCoW: MUST] | [Complexity: TRIVIAL]
Business Requirement: Initialize sequential agentic memory state trackers.
- [x] [ID-1.0.1] [PLANNING/INIT]: Initialize roadmap and update global backlog.

EPIC 2: DYNAMIC MODELS EXPOSURE (BACKEND)

Story 2.0: Backend Models API | [MoSCoW: MUST] | [Complexity: EASY] (&lt;-- Story 1.0)
- [x] [ID-2.0.1] [TESTING/TDE]: Setup Mock for pathlib.Path.glob.
- [x] [ID-2.0.2] [DEVELOPMENT]: Implement GET /api/v1/models.
- [ ] [ID-2.0.3] [DOCUMENTATION/SYNC]: Update skills/context.md with new API.
- [x] [ID-2.0.4] [PLANNING/SYNC]: Update roadmap and global_backlog [REQ-009].

EPIC 3: STATE FRACTALITY (FRONTEND LOGIC VS VIEW)

Story 3.0: Organism State &amp; Network Logic | [MoSCoW: MUST] | [Complexity: MEDIUM]
- [x] [ID-3.0.1] [TESTING/TDE]: Setup fetch mock for /api/v1/models.
- [x] [ID-3.0.2] [DEVELOPMENT]: Update useOrganismSelect.js with async fetching.
- [x] [ID-3.0.3] [PLANNING/SYNC]: Update roadmap and global_backlog [REQ-010].

Story 3.1: Organism Dumb View Wiring | [MoSCoW: MUST] | [Complexity: EASY]
- [x] [ID-3.1.1] [WIRING/DI]: Pass async state props from App.jsx to OrganismCard.
- [x] [ID-3.1.2] [DEVELOPMENT]: Render loading/options in OrganismCard.jsx.
- [x] [ID-3.1.3] [PLANNING/SYNC]: Sync roadmap status.

Story 3.2: Fasta Upload Network Logic | [MoSCoW: MUST] | [Complexity: MEDIUM]
- [x] [ID-3.2.1] [TESTING/TDE]: Setup fetch mock for POST /api/v1/fasta/upload.
- [x] [ID-3.2.2] [DEVELOPMENT]: Refactor useFastaUpload.js for instant upload.
- [x] [ID-3.2.3] [PLANNING/SYNC]: Update roadmap and global_backlog [REQ-011].

Story 3.3: Modern Sequences Modal View | [MoSCoW: MUST] | [Complexity: MEDIUM]
- [x] [ID-3.3.1] [DEVELOPMENT]: Replace &lt;details&gt; with Modal trigger state.
- [x] [ID-3.3.2] [DEVELOPMENT]: Implement FastaUpload Modal View.
- [x] [ID-3.3.3] [PLANNING/SYNC]: Update roadmap and global_backlog [REQ-012].