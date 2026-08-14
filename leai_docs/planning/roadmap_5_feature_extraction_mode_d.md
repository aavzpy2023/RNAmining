---
type: "roadmap"
epic_name: "Feature Extraction & Stateful Results Management (Mode D)"
domain: "Backend Analytics & Frontend UI"
complexity_aggregate: "MEDIUM"
---

EPIC 0: BASE INFRASTRUCTURE & SHARED STATE | [CORE SCHEMAS]

- [x] Story 0.0: Roadmap & Planning Initialization | [MoSCoW: MUST]
  Business Requirement: Initialize sequential agentic memory state trackers ensuring 
  DAG dependencies.
  Story Context Radius: {"leai_docs/planning/global_backlog.md": ["*"]}
  Layered Technical Breakdown:
  - [x] [ID-0.0.1] [PLANNING/INIT]: [1. Update leai_docs/planning/global_backlog.md 
    with new REQ-013 to REQ-021. 2. Write raw markdown (INCLUDING YAML Frontmatter 
    block above) into roadmap_5_feature_extraction_mode_d.md]. Type: Task.

- [x] Story 0.1: DTO Schema Mutations & Semantic Primacy | [MoSCoW: MUST]
  > Files touched: backend/app/schemas/fasta.py, backend/tests/test_schemas.py
  Business Requirement: Extend DTOs to include sequence strings and classification 
  labels while strictly locking to primitives.
  Story Context Radius: {"backend/app/schemas/fasta.py": ["*"], 
  "roadmap_5_feature_extraction_mode_d.md": ["*"], "global_backlog.md": ["*"]}
  Layered Technical Breakdown:
  - [ ] [ID-0.1.1] [TESTING/TDE]: [1. Setup Mock in test_schemas.py. 2. Assert 
    PredictionResultDTO accepts sequence and classification strings]. Type: Task.
  - [ ] [ID-0.1.2] [IMPLEMENTATION]: [1. Open backend/app/schemas/fasta.py. 
    2. Add sequence: str = Field(..., description="Raw RNA sequence"). 
    3. Add classification: str = Field(..., description="Coding label")]. Type: Task.
  - [ ] [ID-0.1.3] [PLANNING/SYNC]: [1. Sync roadmap Story 0.1. 2. Append > Files 
    touched. 3. Sync Backlog REQ-017]. Type: Task.

EPIC 1: IN-MEMORY FEATURE EXTRACTION | [BACKEND ISOLATED]

- [x] Story 1.0: Strict Validation & 3-mer Engine | [MoSCoW: MUST]
  > Files touched: backend/app/utils/validators.py, backend/app/utils/feature_extraction.py
  Business Requirement: Validate FASTA syntax strictly and transform genetic 
  sequences into normalized trinucleotide matrices (<-- REQ-013, REQ-014, REQ-015).
  Story Context Radius: {"backend/app/utils/validators.py": ["*"], 
  "backend/app/utils/feature_extraction.py": ["*"], 
  "backend/tests/test_fasta_parser.py": ["*"], "global_backlog.md": ["*"]}
  Layered Technical Breakdown:
  - [ ] [ID-1.0.1] [TESTING/TDE]: [1. Setup Mock in test_fasta_parser.py. 2. Assert 
    manual validation fails on missing >. 3. Assert extract_3mers list]. Type: Task.
  - [ ] [ID-1.0.2] [IMPLEMENTATION]: [1. Open validators.py. 2. Create strict check 
    that throws ValueError if missing >]. Type: Task.
  - [ ] [ID-1.0.3] [IMPLEMENTATION]: [1. Create feature_extraction.py. 2. Implement 
    extract_3mers(sequence: str) and normalize array by dividing counts]. Type: Task.
  - [ ] [ID-1.0.4] [PLANNING/SYNC]: [1. Sync Roadmap Story 1.0. 2. Sync Backlog 
    REQ-013, REQ-014, REQ-015]. Type: Task.

- [ ] Story 1.1: Inference Engine Boundary Wiring | [MoSCoW: MUST]
  Business Requirement: Explicitly wire the 3-mer extraction into the FastAPI 
  inference route and output the enriched DTO (<-- REQ-016).
  Story Context Radius: {"backend/main.py": ["*"], 
  "backend/app/schemas/fasta.py": ["READONLY"], "global_backlog.md": ["*"]}
  Layered Technical Breakdown:
  - [ ] [ID-1.1.1] [TESTING/TDE]: [1. Mock extract_3mers in test_inference.py. 
    2. Assert /predict returns sequence and classification]. Type: Task.
  - [ ] [ID-1.1.2] [IMPLEMENTATION]: [1. Open main.py. 2. Update /predict loop to 
    call features = [extract_3mers(record.sequence)]]. Type: Task.
  - [ ] [ID-1.1.3] [IMPLEMENTATION]: [1. Open main.py. 2. Map pred to labels. 
    3. Construct and return PredictionResultDTO passing sequence]. Type: Task.
  - [ ] [ID-1.1.4] [PLANNING/SYNC]: [1. Sync Roadmap Story 1.1 & REQ-016]. Type: Task.

EPIC 2: STATE FRACTAL UI & EXPORT CONTROLLERS | [FRONTEND ISOLATED]

- [ ] Story 2.0: Zip Export & Hook Logic (Pure State) | [MoSCoW: MUST]
  Business Requirement: Implement pure JS functions for ZIP creation and state 
  filtering without any UI coupling (<-- REQ-019, REQ-020, REQ-021).
  Story Context Radius: {"frontend/package.json": ["*"], 
  "frontend/src/hooks/useZipExport.js": ["*"], "global_backlog.md": ["*"]}
  Layered Technical Breakdown:
  - [ ] [ID-2.0.1] [TESTING/TDE]: [1. Test useZipExport. 2. Assert FASTA output]. 
  - [ ] [ID-2.0.2] [ENVIRONMENT]: [1. Add jszip and file-saver in package.json].
  - [ ] [ID-2.0.3] [IMPLEMENTATION]: [1. Create useZipExport.js. 2. Implement pure 
    exportSequences logic. 3. Filter sequences. 4. Bundle jszip]. Type: Task.
  - [ ] [ID-2.0.4] [PLANNING/SYNC]: [1. Sync Story 2.0 & REQ-019, 020, 021].

- [ ] Story 2.1: Results Dashboard (Dumb View) & Router Wiring | [MoSCoW: MUST]
  Business Requirement: Build the strictly UI-only /results page (<-- REQ-018).
  Story Context Radius: {"frontend/src/App.jsx": ["*"], 
  "frontend/src/pages/Results.jsx": ["*"], "global_backlog.md": ["*"]}
  Layered Technical Breakdown:
  - [ ] [ID-2.1.1] [TESTING/TDE]: [1. Setup Router memory history mock].
  - [ ] [ID-2.1.2] [IMPLEMENTATION]: [1. Add Route for /results in App.jsx].
  - [ ] [ID-2.1.3] [IMPLEMENTATION]: [1. Update RunButton successful hook navigate].
  - [ ] [ID-2.1.4] [IMPLEMENTATION]: [1. Create Results.jsx. 2. Render dumb table. 
    3. Render buttons triggering exportSequences]. Type: Task.
  - [ ] [ID-2.1.5] [PLANNING/SYNC]: [1. Sync Story 2.1. 2. Sync Backlog REQ-018].