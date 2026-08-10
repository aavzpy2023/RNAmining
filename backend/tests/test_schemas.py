import pytest
from pydantic import BaseModel, ValidationError
from typing import Annotated
from pydantic.functional_validators import AfterValidator
from app.utils.validators import clean_sequence


class MockFastaRecord(BaseModel):
    """Temporary model to verify validator integration before US-3.1."""
    sequence: Annotated[str, AfterValidator(clean_sequence)]


def test_clean_sequence_logic():
    """Validates the atomic logic of the cleaner function."""
    assert clean_sequence("a c g t") == "ACGT"
    assert clean_sequence("A\nC\nG\rT\tU") == "ACGTU"
    assert clean_sequence("  acgt  ") == "ACGT"


def test_clean_sequence_invalid_chars():
    """Ensures exceptions are raised for non-biometric characters."""
    with pytest.raises(ValueError, match="Invalid characters"):
        clean_sequence("ACGTX")
    with pytest.raises(ValueError, match="Invalid characters"):
        clean_sequence("123")


def test_pydantic_integration_success():
    """Verifies that Pydantic correctly applies the AfterValidator."""
    record = MockFastaRecord(sequence="  u u a a  ")
    assert record.sequence == "UUAA"


def test_pydantic_integration_failure():
    """Verifies that Pydantic captures the ValueError from the validator."""
    with pytest.raises(ValidationError) as excinfo:
        MockFastaRecord(sequence="ACGT-ERROR")
    assert "Invalid characters" in str(excinfo.value)