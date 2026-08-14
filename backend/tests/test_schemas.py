import pytest
from pydantic import ValidationError
from app.schemas.fasta import PredictionResultDTO

def test_prediction_result_dto_primitives():
    """Assert PredictionResultDTO accepts primitive strings for sequence and classification."""
    data = {
        "header": "seq1",
        "sequence": "AUGCGA",
        "prediction": 1,
        "probability": 0.99,
        "classification": "coding"
    }
    dto = PredictionResultDTO(**data)
    
    assert dto.header == "seq1"
    assert dto.sequence == "AUGCGA"
    assert dto.prediction == 1
    assert dto.probability == 0.99
    assert dto.classification == "coding"

def test_prediction_result_dto_strict_types():
    """Assert strict type enforcement for primitives."""
    with pytest.raises(ValidationError):
        PredictionResultDTO(
            header="seq1",
            sequence=123,  # Invalid: requires str
            prediction="not-an-int",
            probability=0.9,
            classification="coding"
        )