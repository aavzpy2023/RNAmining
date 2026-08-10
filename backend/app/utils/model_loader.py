import joblib
from pathlib import Path
from typing import Any, Optional

def load_model(path: str) -> Optional[Any]:
    """
    Loads a joblib/pickle model from the specified path.
    Strictly under 25 lines limit.
    """
    model_path = Path(path)
    if not model_path.exists():
        # Log/Warning could go here in production
        return None
    return joblib.load(model_path)