---
type: "roadmap"
epic_name: "RESULTS TABLE UI & DATA BINDING FIXES"
domain: "Frontend / UI"
complexity_aggregate: "EASY"
---

EPIC 1: RESULTS TABLE UI & DATA BINDING FIXES | [ISOLATED VERTICAL]

Story 1.0: Roadmap & Planning Initialization | [MoSCoW: MUST] | [Complexity: TRIVIAL]
Business Requirement: Initialize sequential agentic memory state trackers ensuring DAG dependencies.
Story Context Radius: {"leai_docs/planning/global_backlog.md": ["*"]}
Layered Technical Breakdown:
- [x] [ID-1.0.1] [PLANNING/INIT]: [1. Create leai_docs/planning/ directory if missing. 2. Update leai_docs/planning/global_backlog.md by appending REQ-024 and REQ-025 under a new section "## Results Table Fixes". 3. Write raw markdown (INCLUDING the YAML Frontmatter block above) into leai_docs/planning/roadmap_8_results_table_fixes.md]. Type: Task.

[x] Story 1.1: Headless Logic Refactoring (State Fractality) | [MoSCoW: MUST] | [Complexity: EASY]
> Files touched: frontend/src/hooks/useTableLogic.js
Story Context Radius: {"frontend/src/hooks/useTableLogic.js": ["*"], "leai_docs/planning/roadmap_8_results_table_fixes.md": ["*"], "leai_docs/planning/global_backlog.md": ["*"]}
Layered Technical Breakdown (FLASH-COMPATIBLE ALGORITHMS):
- [ ] [ID-1.1.1] [TESTING/TDE]: [1. Setup an in-memory mock array with `{ id: 'seq1', classification: 'coding', probability: 0.99 }`. 2. Assert that the headless hook's search filter correctly matches the 'classification' key. 3. Assert pagination bounds remain stable]. Type: Task.
- [ ] [ID-1.1.2] [LOGIC/IMPLEMENTATION]: [1. Open `frontend/src/hooks/useTableLogic.js`. 2. In the `processedData` useMemo block, surgically replace `item.prediction` with `item.classification` in the search filter logic. 3. Update the JSDoc `@param` to reflect `classification` instead of `prediction`]. Type: Task. (<-- REQ-024)
- [ ] [ID-1.1.3] [PLANNING/SYNC]: [1. Open leai_docs/planning/roadmap_8_results_table_fixes.md and check - [x] for Story 1.1. 2. Append > Files touched: frontend/src/hooks/useTableLogic.js under the story. 3. Open leai_docs/planning/global_backlog.md and check - [x] for [REQ-024]]. Type: Task.

[x] Story 1.2: Dumb View Determinism & Data Binding (UI) | [MoSCoW: MUST] | [Complexity: EASY]
> Files touched: frontend/src/components/ResultsTable.jsx
Story Context Radius: {"frontend/src/components/ResultsTable.jsx": ["*"], "frontend/src/pages/Results.jsx": ["READ-ONLY"], "leai_docs/planning/roadmap_8_results_table_fixes.md": ["*"], "leai_docs/planning/global_backlog.md": ["*"]}
Layered Technical Breakdown (FLASH-COMPATIBLE ALGORITHMS):
- [ ] [ID-1.2.1] [TESTING/TDE]: [1. Setup a mock render of `ResultsTable` with dummy classification data. 2. Assert that `tableLayout: 'fixed'` is present on the table node. 3. Assert that 'unknown' is rendered if classification is missing]. Type: Task.
- [ ] [ID-1.2.2] [UI/IMPLEMENTATION]: [1. Open `frontend/src/components/ResultsTable.jsx`. 2. Locate the `<table>` style object and inject `tableLayout: 'fixed'`. 3. Locate the `<thead>` and inject explicit widths (e.g., `width: '33%'`) into the three `<th>` elements to lock the grid]. Type: Task. (<-- REQ-025)
- [ ] [ID-1.2.3] [UI/IMPLEMENTATION]: [1. In `frontend/src/components/ResultsTable.jsx`, locate the `<tbody>` mapping. 2. Surgically replace `<td style={tdStyle}>{row.prediction}</td>` with `<td style={tdStyle}>{row.classification || 'unknown'}</td>`. 3. Ensure `row.probability` fallback handles undefined gracefully via `Number(row.probability || 0).toFixed(4)`]. Type: Task. (<-- REQ-024)
- [ ] [ID-1.2.4] [PLANNING/SYNC]: [1. Open leai_docs/planning/roadmap_8_results_table_fixes.md and check - [x] for Story 1.2. 2. Append > Files touched: frontend/src/components/ResultsTable.jsx under the story. 3. Open leai_docs/planning/global_backlog.md and check - [x] for [REQ-025]]. Type: Task.