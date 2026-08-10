import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from pathlib import Path
from backend.main import app

client = TestClient(app)

def test_get_models_dynamic_scan():
    """Validates that /api/v1/models scans the directory and returns stems."""
    mock_files = [
        MagicMock(spec=Path, stem="rna_v1", suffix=".pkl"),
        MagicMock(spec=Path, stem="deep_rna", suffix=".pkl"),
        MagicMock(spec=Path, stem="readme", suffix=".txt"),
    ]
    
    # We patch Path.glob to return only the .pkl mocks
    with patch("backend.main.Path.glob") as mock_glob:
        mock_glob.return_value = [f for f in mock_files if f.suffix == ".pkl"]
        
        response = client.get("/api/v1/models")
        
        assert response.status_code == 200
        data = response.json()
        assert "models" in data
        assert "rna_v1" in data["models"]
        assert "deep_rna" in data["models"]
        assert "readme" not in data["models"]