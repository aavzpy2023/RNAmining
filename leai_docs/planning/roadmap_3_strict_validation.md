---
type: "roadmap"
epic_name: "STRICT BIOMETRIC BOUNDARY MARSHAL"
domain: "Backend/Architecture"
complexity_aggregate: "MEDIUM"
---

# Roadmap 3: Strict Biometric Boundary Marshal

## EPIC 1: BOOTSTRAP & ENVIRONMENT INITIALIZATION

- [x] **Story 1.0: Roadmap & Planning Initialization**
    - [x] [ID-1.0.1] [PLANNING/INIT]: Verify/Create `leai_docs/planning/` directory, update `global_backlog.md` with REQ-001/002/003, and persist this roadmap.

## EPIC 2: CORE BIOMETRIC PRIMITIVES

- [x] **Story 2.0: Shared Validation Utilities**
    - [x] [ID-2.0.1] [DEVELOPMENT]: Create `backend/app/utils/validators.py`, define `RNA_DNA_REGEX`, and implement `clean_sequence`.
    - [x] [ID-2.0.2] [DOCUMENTATION/SYNC]: Register validators in `skills/context.md`.

## EPIC 3: THE BOUNDARY MARSHAL (SCHEMA ENFORCEMENT)

- [x] **Story 3.0: TDE - Biometric Validation Suite**
    - [x] [ID-3.0.1] [TESTING/TDE]: Create `backend/tests/test_schemas.py` and validate biometric constraints.

- [x] **Story 3.1: Strict Pydantic Implementation**
    - [x] [ID-3.1.1] [DEVELOPMENT]: Redefine `sequence` using `Annotated` and `AfterValidator`.
    - [x] [ID-3.1.2] [WIRING/DI]: Update `main.py` with strict type-hinting.
    - [x] [ID-3.1.3] [PLANNING/SYNC]: Sync `global_backlog.md` and close roadmap.