from fastapi import FastAPI, UploadFile, File, HTTPException
import sys
from typing import List
from pathlib import Path
from contextlib import asynccontextmanager
from app.schemas.fasta import (
    SampleFastaResponse, FastaRecordDTO, 
    PredictionRequestDTO, PredictionResponseDTO, PredictionResultDTO
)
from app.utils.fasta_parser import parse_fasta_bytes
from app.utils.model_loader import load_model

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handles application startup and shutdown events."""
    model_path = "backend/app/models/rna_classifier.joblib"
    app.state.model = load_model(model_path)
    yield
    if hasattr(app.state, "model"):
        del app.state.model

app = FastAPI(lifespan=lifespan)

@app.get("/api/v1/fasta/sample", response_model=SampleFastaResponse)
def get_sample_fasta():
    """
    Returns a predefined sample FASTA file content for exploration.
    """
    sample_path = Path("backend/app/samples/sample.fasta")
    content = sample_path.read_text()
    
    records = []
    lines = content.splitlines()
    for i in range(0, len(lines), 2):
        header = lines[i].replace(">", "")
        seq = lines[i+1]
        records.append(FastaRecordDTO(
            header=header, 
            sequence=seq, 
            length=len(seq)
        ))
    
    return SampleFastaResponse(filename="sample.fasta", records=records)

@app.post("/api/v1/fasta/upload", response_model=List[FastaRecordDTO])
async def upload_fasta(file: UploadFile = File(...)):
    """
    Receives a .fasta file, parses it, and returns structured DTOs.
    """
    if not file.filename.lower().endswith((".fasta", ".fa")):
        raise HTTPException(status_code=400, detail="Invalid file extension")
    
    content = await file.read()
    return parse_fasta_bytes(content)

@app.post("/api/v1/fasta/predict", response_model=PredictionResponseDTO)
async def predict_fasta(request: PredictionRequestDTO):
    """
    Executes ML inference on a list of FASTA records.
    """
    if not getattr(app.state, "model", None):
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    results = []
    for record in request.records:
        # Feature extraction: sequence length as basic indicator
        features = [[len(record.sequence)]]
        pred = int(app.state.model.predict(features)[0])
        prob = float(app.state.model.predict_proba(features)[0][pred])
        
        results.append(PredictionResultDTO(
            header=record.header,
            prediction=pred,
            probability=round(prob, 4)
        ))
    
    return PredictionResponseDTO(results=results, model_version="v1.0.0")

@app.get("/api/requirements")
def get_requirements():
    return {
        "python_version": sys.version.split()[0],
        "framework": "FastAPI 0.110.0",
        "database": "SQLITE (Versión: N/A)",
        "proxy": "Nginx (Puerto 80)" if True else "Directo (Puerto 5173/8000)",
        "status": "¡Entorno moderno con pyproject.toml listo! 🚀"
    }
