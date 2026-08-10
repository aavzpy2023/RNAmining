---
type: "roadmap"
epic_name: "Frontend Dashboard & UI Integration"
domain: "frontend"
complexity_aggregate: "EASY"
---

# Roadmap 2: Frontend Dashboard & UI Integration

## Epic 1: Frontend Dashboard & UI Integration

### Story 1.0: Roadmap & Planning Initialization
- [x] [ID-1.0.1] [PLANNING/INIT]: Create roadmap and update backlog.

### Story 1.1: Design System Shell & Layout Frame - [x]
> Files touched: [frontend/src/App.jsx, frontend/src/components/Navbar.jsx, frontend/src/components/Footer.jsx, frontend/src/App.test.jsx]
- [ ] [ID-1.1.1] [TESTING/TDE]: Unit test layout rendering frame.
- [ ] [ID-1.1.2] [FRONTEND/VIEW]: Create Navbar, Footer and App shell.
- [ ] [ID-1.1.3] [DOCUMENTATION/SYNC]: Update layout rules in context.
- [ ] [ID-1.1.4] [PLANNING/SYNC]: Sync Story 1.1 in roadmap and backlog.

### Story 1.2: FASTA Upload State Hook & UI Component - [x]
> Files touched: [frontend/src/hooks/useFastaUpload.js, frontend/src/components/FastaUploadCard.jsx, frontend/src/hooks/useFastaUpload.test.js]
- [ ] [ID-1.2.1] [TESTING/TDE]: Test useFastaUpload state handlers.
- [ ] [ID-1.2.2] [FRONTEND/LOGIC]: Implement useFastaUpload hook.
- [ ] [ID-1.2.3] [FRONTEND/VIEW]: Create FastaUploadCard component.
- [ ] [ID-1.2.4] [DOCUMENTATION/SYNC]: Document hook in skills/context.md.
- [ ] [ID-1.2.5] [PLANNING/SYNC]: Sync Story 1.2 in roadmap and backlog.

### Story 1.3: Organism Selection State Hook & UI Component - [x]
> Files touched: [frontend/src/hooks/useOrganismSelect.js, frontend/src/components/OrganismCard.jsx, frontend/src/hooks/useOrganismSelect.test.js]
- [ ] [ID-1.3.1] [TESTING/TDE]: Test organism selector state logic.
- [ ] [ID-1.3.2] [FRONTEND/LOGIC]: Implement useOrganismSelect hook.
- [ ] [ID-1.3.3] [FRONTEND/VIEW]: Create OrganismCard view component.
- [ ] [ID-1.3.4] [DOCUMENTATION/SYNC]: Document selector interface.
- [ ] [ID-1.3.5] [PLANNING/SYNC]: Sync Story 1.3 in roadmap and backlog.

### Story 1.4: Pipeline Execution Trigger & API Service Integration - [x]
> Files touched: [frontend/src/services/api.js, frontend/src/hooks/useAnalysisRunner.js, frontend/src/components/RunButton.jsx, frontend/src/App.jsx, frontend/src/hooks/useAnalysisRunner.test.js]
- [ ] [ID-1.4.1] [TESTING/TDE]: Mock test for /api/inference client.
- [ ] [ID-1.4.2] [FRONTEND/LOGIC]: Create API client and runner hook.
- [ ] [ID-1.4.3] [FRONTEND/VIEW]: Integrate RunButton and layout state.
- [ ] [ID-1.4.4] [DOCUMENTATION/SYNC]: Update skills/context.md pipeline.
- [ ] [ID-1.4.5] [PLANNING/SYNC]: Sync Story 1.4 in roadmap and backlog.