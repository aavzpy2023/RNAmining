# Global Backlog: RNA Mining Project

## Functional Requirements (Core Pipeline)

- [x] [REQ-001] Serve sample FASTA sequences for API consumer exploration.
- [x] [REQ-002] Provide a multipart file upload endpoint for FASTA data.
- [x] [REQ-003] Implement a stream parsing engine for converting FASTA bytes to DTOs.
- [x] [REQ-004] Execute ML model inference via FastAPI lifespan dependency injection.

## Technical Debt & Infrastructure

- [x] [TECH-001] Baseline dependency provisioning (Biopython, Scikit-learn).
- [x] [TECH-002] Primitive-bound Pydantic schema enforcement.

## Frontend Requirements

- [x] [REQ-005] Render responsive layout frame with navigation header and footer.
- [x] [REQ-006] Implement FASTA file upload area with drag-and-drop support.
- [x] [REQ-007] Implement organism selector component for target prediction.
- [x] [REQ-008] Trigger inference pipeline execution and display output results.
- [x] [REQ-009] Expose dynamic ML model list via backend API.
- [x] [REQ-010] Implement async model fetching in frontend organism logic.
- [x] [REQ-011] Implement automated multipart upload on file selection.
- [x] [REQ-012] Refactor sample sequences view into a high-fidelity modal.

## Feature Extraction & Stateful Results (Mode D)

- [x] [REQ-013] Validate FASTA syntax strictly (throw ValueError on missing >).
- [x] [REQ-014] Transform genetic sequences into normalized trinucleotide matrices.
- [x] [REQ-015] Normalize 3-mer array by dividing counts by sum.
- [x] [REQ-016] Wire 3-mer extraction into FastAPI route and output enriched DTO.
- [x] [REQ-017] Extend DTO schemas with sequence and classifications (primitives).
- [ ] [REQ-018] Build strictly UI-only /results page to visually render table.
- [ ] [REQ-019] Implement pure JS function for ZIP creation in frontend hooks.
- [ ] [REQ-020] Implement pure JS function for state filtering (classification).
- [ ] [REQ-021] Bundle filtered sequences into a zip and trigger file-saver.