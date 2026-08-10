import sys
from pathlib import Path

# Military-Grade Path Injection:
# Ensures the 'backend' directory is in sys.path, making 'app' and 'main'
# available as top-level modules during local test execution.
# This aligns local behavior with the Docker WORKDIR /app environment.
root_dir = Path(__file__).resolve().parent
if str(root_dir) not in sys.path:
    sys.path.insert(0, str(root_dir))