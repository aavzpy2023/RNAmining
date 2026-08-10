import pytest
from fastapi.testclient import TestClient
from unittest.mock import MagicMock
from main import app

client = TestClient(app)

@pytest.fixture
def mock_model():
    """Creates a mock model mimicking scikit-learn interface."""
    model = MagicMock()
    model.predict.return_value = [1]
    model.predict_proba.return_value = [[0.1, 0.9]]
    return model

def test_predict_endpoint_no_model():
    """Validates 503 error if the model is missing from app state."""
    app.state.model = None
    payload = {
        "records": [{"header": "seq1", "sequence": "ACGU", "length": 4}]
    }
    response = client.post("/api/v1/fasta/predict", json=payload)
    assert response.status_code == 503
    assert "Model not loaded" in response.json()["detail"]

def test_predict_endpoint_success(mock_model):
    """Validates successful prediction workflow with a mock model."""
    app.state.model = mock_model
    payload = {
        "records": [{"header": "seq1", "sequence": "ACGU", "length": 4}]
    }
    response = client.post("/api/v1/fasta/predict", json=payload)
    assert response.status_code == 200
    
    data = response.json()
    assert data["model_version"] == "v1.0.0"
    assert data["results"][0]["prediction"] == 1
    assert data["results"][0]["probability"] == 0.9