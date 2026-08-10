# RNA Mining: Global Context

## Architecture Overview
- Orchestration: Docker Compose (Nginx + Frontend + Backend).
- Proxy: Nginx Reverse Proxy as Global Entrypoint (Port 80).
- Backend: FastAPI (Hexagonal/Vertical Slice).
- ML Pipeline: Scikit-learn + Joblib for model persistence.
- Data: Biopython for FASTA/FASTQ parsing.

## Directory Standards
- `backend/app/models/`: Production ML models (.pickle/.joblib).
- `backend/app/lifespan`: Model DI managed via FastAPI lifespan context.
- `backend/app/schemas/`: Pydantic DTOs (Primitive-bound).
- `backend/app/utils/`: Business logic and stream parsers.
- `backend/app/samples/`: Datasets (coding.fasta, noncoding.fasta, edata.fasta).
- `backend/conftest.py`: Configures PYTHONPATH for local test execution.
- `leai_docs/planning/`: Source of truth for roadmap and backlog.