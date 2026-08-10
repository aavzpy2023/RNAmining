# RNA Mining: Neural Coding Potential Predictor

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react)
![Scikit-Learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)

RNA Mining is a high-performance bioinformatic pipeline designed for the 
prediction of nucleotide coding potential using advanced Machine Learning 
architectures. 

## 🏗️ Technical Architecture

The project follows a **Vertical Slice Architecture** with **Hexagonal 
Boundaries**, ensuring total isolation between the bioinformatic parsing 
engine and the web delivery layers.

- **Backend:** FastAPI 0.110+, Python 3.11+
- **ML Engine:** Scikit-Learn (XGBoost Optimized) via Joblib persistence.
- **Parsing:** Biopython stream-based FASTA processing.
- **Frontend:** React 19 + Vite (Modern State Management).

## 📂 Project Structure

```text
├── backend/                # Python Microservice
│   ├── app/
│   │   ├── models/         # Binary ML Models (.joblib)
│   │   ├── schemas/        # Primitive-bound Pydantic DTOs
│   │   └── utils/          # Bioinformatic Stream Parsers
│   └── tests/              # Military-Grade Pytest Suite
├── frontend-react/         # Modern React 19 UI
└── leai_docs/              # Agentic Planning & Roadmaps
```

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
# Using uv (recommended) or pip
pip install -r pyproject.toml
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend-react
npm install
npm run dev
```

## 🛡️ API Features

- `GET  /api/v1/fasta/sample`: Exploration of TAIR10 sample sequences.
- `POST /api/v1/fasta/upload`: Multipart stream parsing into structured DTOs.
- `POST /api/v1/fasta/predict`: High-concurrency ML inference via Lifespan DI.

---
**Lead Architect:** Andrey Vinajera Zamora (PhD)
