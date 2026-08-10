import importlib.util
import pytest

@pytest.mark.parametrize("package_name,module_name", [
    ("fastapi", "fastapi"),
    ("python-multipart", "multipart"),
    ("scikit-learn", "sklearn"),
    ("joblib", "joblib"),
    ("biopython", "Bio"),
    ("numpy", "numpy"),
    ("pandas", "pandas"),
])
def test_dependency_imports(package_name, module_name):
    """
    Military-Grade Verification: Ensures all core dependencies are 
    accessible in the environment before proceeding to implementation.
    """
    spec = importlib.util.find_spec(module_name)
    assert spec is not None, f"Package {package_name} (module {module_name}) not found"