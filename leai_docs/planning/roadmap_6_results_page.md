---
type: "roadmap"
epic_name: "Dedicated Analysis Results Page & Exporters (Mode D)"
domain: "Frontend State & View Fractality"
complexity_aggregate: "HARD"
---

**EPIC 1: HEADLESS LOGIC & DUMB VIEW IMPLEMENTATION | ISOLATED VERTICAL**

**Story 1.0: Roadmap & Planning Initialization | [MoSCoW: MUST] | [Complexity: TRIVIAL]**
**Business Requirement:** Initialize sequential agentic memory state trackers ensuring DAG dependencies.
**Story Context Radius:** `{"leai_docs/planning/global_backlog.md": ["*"]}`
**Layered Technical Breakdown:**
- [x] [ID-1.0.1] [PLANNING/INIT]: [1. Create leai_docs/planning/ directory if missing. 2. Update leai_docs/planning/global_backlog.md strictly applying REQ-013 to REQ-016. 3. Write raw markdown (INCLUDING the YAML Frontmatter block above) into leai_docs/planning/roadmap_6_results_page.md]. Type: Task.

**Story 1.1: State Orchestration & Router Wiring | [MoSCoW: MUST] | [Complexity: MEDIUM]**
**Business Requirement:** Safely zip raw sequence data with backend predictions and dispatch to a new route strictly preserving state.
**Story Context Radius:** `{"frontend/src/App.jsx": ["*"], "frontend/src/components/RunSection.jsx": ["*"]}`
**Layered Technical Breakdown:**
- [x] [ID-1.1.1] [TESTING/TDE]: [1. Setup MemoryRouter mock. 2. Assert navigation sends a purely primitive unified array. 3. Assert error/undefined boundary handling]. Type: Task.
- [x] [ID-1.1.2] [ROUTING/WIRING]: [1. Open frontend/src/App.jsx. 2. Import a stubbed `Results` component (to be built) and map it to `/results`. 3. Apply route constraints]. Type: Task.
- [x] [ID-1.1.3] [STATE/LOGIC]: [1. Open frontend/src/components/RunSection.jsx. 2. Create the `unifiedData` array by mapping original FASTA sequences with prediction results based on Sequence ID. 3. Trigger `navigate('/results', { state: { data: unifiedData } })` using JSDoc English comments]. Type: Task.
- [x] [ID-1.1.4] [PLANNING/SYNC]: [1. Open leai_docs/planning/roadmap_6_results_page.md and check - [x] for Story 1.1. 2. Append > Files touched: [App.jsx, RunSection.jsx]. 3. Open leai_docs/planning/global_backlog.md and check - [x] for [REQ-013]]. Type: Task.
> Files touched: [App.jsx, RunSection.jsx, RunSection.test.jsx]

**Story 1.2: Headless Table Logic (State Fractality) | [MoSCoW: MUST] | [Complexity: MEDIUM]**
**Business Requirement:** Extract all sorting, searching, and 40-item pagination math into a purely logic-based headless hook.
**Story Context Radius:** `{"frontend/src/hooks/useTableLogic.js": ["*"]}`
**Layered Technical Breakdown:**
- [x] [ID-1.2.1] [TESTING/TDE]: [1. Setup `renderHook` mock for `useTableLogic`. 2. Assert pagination strictly returns max 40 items. 3. Assert text search filters items accurately]. Type: Task.
- [x] [ID-1.2.2] [HOOK/CORE]: [1. Create frontend/src/hooks/useTableLogic.js. 2. Define `useTableLogic(initialData)` with internal `useState` for search, sort key, and page. 3. Write JSDoc English comments defining the input/output boundaries]. Type: Task.
- [x] [ID-1.2.3] [HOOK/MEMOIZATION]: [1. Implement `useMemo` to sequentially apply search filter, then sorting, then pagination slicing. 2. Expose `{ paginatedData, totalPages, currentPage, setPage, setSearch, setSort }`. 3. Export hook]. Type: Task.
- [x] [ID-1.2.4] [PLANNING/SYNC]: [1. Open leai_docs/planning/roadmap_6_results_page.md and check - [x] for Story 1.2. 2. Append > Files touched: [useTableLogic.js]]. Type: Task.
> Files touched: [useTableLogic.js, useTableLogic.test.js]

**Story 1.3: Dumb Table View Implementation | [MoSCoW: MUST] | [Complexity: EASY]**
**Business Requirement:** Build a purely presentational table component consuming the headless logic, strictly in English.
**Story Context Radius:** `{"frontend/src/components/ResultsTable.jsx": ["*"], "frontend/src/hooks/useTableLogic.js": ["read-only"]}`
**Layered Technical Breakdown:**
- [x] [ID-1.3.1] [TESTING/TDE]: [1. Setup DOM testing with mock props. 2. Assert English headers render: 'Sequence ID', 'Coding Potential', 'Probability'. 3. Assert 40 rows maximum render]. Type: Task.
- [x] [ID-1.3.2] [VIEW/RENDER]: [1. Create frontend/src/components/ResultsTable.jsx. 2. Accept `data`, `searchHandlers`, `paginationHandlers` as props. 3. Map over `data` to output `<tr>` elements]. Type: Task.
- [x] [ID-1.3.3] [VIEW/CONTROLS]: [1. Inject an `<input>` for search wired to the passed handler. 2. Inject pagination `<button>`s wired to the passed page setter. 3. Ensure all static text is 100% English]. Type: Task.
- [x] [ID-1.3.4] [PLANNING/SYNC]: [1. Open leai_docs/planning/roadmap_6_results_page.md and check - [x] for Story 1.3. 2. Open leai_docs/planning/global_backlog.md and check - [x] for [REQ-014], [REQ-016]]. Type: Task.
> Files touched: [ResultsTable.jsx, ResultsTable.test.jsx]

**Story 1.4: Headless FASTA Blob Exporter | [MoSCoW: MUST] | [Complexity: HARD]**
**Business Requirement:** Implement an atomic headless hook to serialize unified data arrays back into raw FASTA blobs.
**Story Context Radius:** `{"frontend/src/hooks/useFastaExport.js": ["*"]}`
**Layered Technical Breakdown:**
- [ ] [ID-1.4.1] [TESTING/TDE]: [1. Setup Blob and URL mock in Jest/Vitest. 2. Assert `exportCoding` strictly filters out non-coding items before Blob generation. 3. Assert FASTA newline format is exact]. Type: Task.
- [ ] [ID-1.4.2] [HOOK/GENERATOR]: [1. Create frontend/src/hooks/useFastaExport.js. 2. Write `generateBlob(data)` mapping array to `>id\nseq\n` string. 3. Write explicit JSDoc comments detailing the formatting logic]. Type: Task.
- [ ] [ID-1.4.3] [HOOK/EXPORTS]: [1. Implement `exportAll(data)`, `exportCoding(data)`, `exportNonCoding(data)` using `generateBlob` and `URL.createObjectURL`. 2. Return an object exposing these 3 methods. 3. Ensure memory cleanup (revokeObjectURL)]. Type: Task.
- [ ] [ID-1.4.4] [PLANNING/SYNC]: [1. Open leai_docs/planning/roadmap_6_results_page.md and check - [x] for Story 1.4. 2. Open leai_docs/planning/global_backlog.md and check - [x] for [REQ-015]]. Type: Task.

**Story 1.5: Results Page Assembly (Dumb Container) | [MoSCoW: MUST] | [Complexity: EASY]**
**Business Requirement:** Mount the headless hooks and dumb views into a top-level page component handling null-state fallback.
**Story Context Radius:** `{"frontend/src/pages/Results.jsx": ["*"], "frontend/src/components/ResultsTable.jsx": ["read-only"], "frontend/src/hooks/useTableLogic.js": ["read-only"], "frontend/src/hooks/useFastaExport.js": ["read-only"], "skills/context.md": [""]}`
**Layered Technical Breakdown:**
- [ ] [ID-1.5.1] [TESTING/TDE]: [1. Mount `Results` page with mock router location. 2. Assert fallback rendering ("No data available. Please run an analysis.") if state is null. 3. Assert exporter buttons trigger hook methods]. Type: Task.
- [ ] [ID-1.5.2] [ASSEMBLY/MOUNT]: [1. Create frontend/src/pages/Results.jsx. 2. Use `useLocation()` to extract `state.data`. 3. If missing, render English fallback boundary]. Type: Task.
- [ ] [ID-1.5.3] [ASSEMBLY/WIRING]: [1. Invoke `useTableLogic(data)` and pass outputs to `<ResultsTable />`. 2. Invoke `useFastaExport()` and map the 3 export methods to explicitly labeled English download buttons. 3. Render final view]. Type: Task.
- [ ] [ID-1.5.4] [DOCUMENTATION/SYNC]: [1. Open skills/context.md. 2. Document the strict Fractality Pattern (Hooks vs Views) established in this epic]. Type: Task.
- [ ] [ID-1.5.5] [PLANNING/SYNC]: [1. Open leai_docs/planning/roadmap_6_results_page.md and check - [x] for Story 1.5. 2. Validate all Requirements REQ-013 to REQ-016 are checked in global backlog]. Type: Task.