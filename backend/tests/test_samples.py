from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_sample_fasta_success():
    """
    Validates that the sample endpoint returns a valid SampleFastaResponse
    with primitive types and correct structure.
    """
    response = client.get("/api/v1/fasta/sample")
    assert response.status_code == 200
    
    data = response.json()
    assert "filename" in data
    assert "records" in data
    assert isinstance(data["records"], list)
    
    if len(data["records"]) > 0:
        record = data["records"][0]
        assert "header" in record
        assert "sequence" in record
        assert "length" in record
        assert isinstance(record["length"], int)