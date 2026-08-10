from pydantic import BaseModel, Field
from typing import List

class FastaRecordDTO(BaseModel):
    """
    DTO for a single FASTA record. 
    Strictly uses primitive types for boundary safety.
    """
    header: str = Field(..., description="The FASTA sequence header")
    sequence: str = Field(..., description="The raw RNA/DNA sequence string")
    length: int = Field(..., description="Length of the sequence")

class SampleFastaResponse(BaseModel):
    """
    Response schema for sample sequence listing.
    """
    filename: str
    records: List[FastaRecordDTO]

class PredictionRequestDTO(BaseModel):
    """Input DTO for batch inference."""
    records: List[FastaRecordDTO]

class PredictionResultDTO(BaseModel):
    """Individual prediction outcome."""
    header: str
    prediction: int
    probability: float

class PredictionResponseDTO(BaseModel):
    """Final batch prediction response."""
    results: List[PredictionResultDTO]
    model_version: str