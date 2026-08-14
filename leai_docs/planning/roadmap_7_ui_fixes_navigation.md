---
type: "roadmap"
epic_name: "UI Refinement: Progress Visuals & Results Navigation"
domain: "Frontend Layout & Routing"
complexity_aggregate: "MEDIUM"
---

# EPIC 1: UI REFINEMENT: PROGRESS VISUALS & RESULTS NAVIGATION | FRONTEND VERTICAL

## - [x] Story 1.0: Roadmap & Planning Initialization | [MoSCoW: MUST] | [Complexity: TRIVIAL]
Business Requirement: Initialize sequential agentic memory state trackers ensuring DAG dependencies.
- [x] [ID-1.0.1] [PLANNING/INIT]: [1. Create leai_docs/planning/ directory if missing. 2. Update leai_docs/planning/global_backlog.md with [REQ-022] and [REQ-023]. 3. Write raw markdown (INCLUDING the YAML Frontmatter block above) into leai_docs/planning/roadmap_7_ui_fixes_navigation.md]. Type: Task.

## - [ ] Story 1.1: [State Fractality] Navigation Lifecycle & Data Unification | [MoSCoW: MUST] | [Complexity: MEDIUM] (<-- REQ-023)
Business Requirement: Isolate the text extraction and DTO formatting logic away from the UI rendering cycle to ensure deterministic payload generation for the /results page.
- [ ] [ID-1.1.1] [TESTING/TDE]: [1. Setup In-Memory Jest/Vitest mock for createUnifiedData. 2. Assert it strictly returns the UnifiedDataDTO array without side effects. 3. Mock file async reading]. Type: Task.
- [ ] [ID-1.1.2] [LOGIC/HOOKS]: [1. In RunSection.jsx, audit the useEffect block. 2. Ensure file.text() is safely awaited and wrapped in a robust try/catch that guarantees processAndNavigate completes before unlocking the state. 3. Prevent execution if result or file are null]. Type: Task.
- [ ] [ID-1.1.3] [PLANNING/SYNC]: [1. Open leai_docs/planning/roadmap_7_ui_fixes_navigation.md and check - [x] for Story 1.1. 2. Append > Files touched: [list] under the story]. Type: Task.

## - [x] Story 1.2: [Dumb View] Component De-duplication & Routing Trigger | [MoSCoW: MUST] | [Complexity: EASY] (<-- REQ-023)
Business Requirement: Eradicate duplicated navigation logic in the UI layer. Ensure only one component dictates the router transition.
- [x] [ID-1.2.1] [TESTING/TDE]: [1. Mount RunButton and RunSection with mock Router. 2. Assert RunButton strictly triggers onClick and DOES NOT call navigate. 3. Assert RunSection triggers navigate correctly]. Type: Task.
- [x] [ID-1.2.2] [VIEW/PRUNE]: [1. Open frontend/src/components/RunButton.jsx. 2. Delete the import { useNavigate } statement. 3. Remove the if (data?.results) navigate(...) line from the onClick handler. Force it to be a completely dumb component]. Type: Task.
- [x] [ID-1.2.3] [VIEW/WIRING]: [1. Verify RunSection.jsx passes the correct isRunning, disabled, and onClick props down to the button without internal state leakage]. Type: Task.
- [x] [x] [ID-1.2.4] [PLANNING/SYNC]: [1. Open leai_docs/planning/roadmap_7_ui_fixes_navigation.md and check - [x] for Story 1.2. 2. Append > Files touched: [list] under the story. 3. Open leai_docs/planning/global_backlog.md and check - [x] for [REQ-023]]. Type: Task.
> Files touched: frontend/src/components/Routing.test.jsx, frontend/src/components/RunButton.jsx

## - [x] Story 1.3: [Micro-Surgery] Visual Progress Bar Determinism | [MoSCoW: MUST] | [Complexity: EASY] (<-- REQ-022)
Business Requirement: Force the global/upload progress indicator to bypass all intermediate color transitions (blue) and render strictly in green (#22c55e or equivalent) from 0% to 100%.
- [x] [ID-1.3.1] [TESTING/TDE]: [1. Setup CSS parsing mock. 2. Assert global loading bar class or nprogress config does not define a blue hexadecimal or transition]. Type: Task.
- [x] [ID-1.3.2] [STYLE/OVERRIDE]: [1. Locate the progress bar library config (e.g., nprogress in App.jsx) or global CSS file (index.css). 2. Inject a rigid CSS override targeting the progress bar class (e.g., #nprogress .bar, .progress-bar). 3. Set background: #22c55e !important and strip multi-color animation keyframes]. Type: Task.
- [x] [ID-1.3.3] [PLANNING/SYNC]: [1. Open leai_docs/planning/roadmap_7_ui_fixes_navigation.md and check - [x] for Story 1.3. 2. Append > Files touched: [list] under the story. 3. Open leai_docs/planning/global_backlog.md and check - [x] for [REQ-022]]. Type: Task.
> Files touched: frontend/src/App.jsx, frontend/src/components/ProgressStyle.test.jsx