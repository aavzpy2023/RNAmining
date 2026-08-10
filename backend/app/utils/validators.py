import re

RNA_DNA_REGEX = r"^[ACGTUacgtu\s]+$"


def clean_sequence(v: str) -> str:
    """
    Validates and cleans biometric sequences.

    1. Validates against allowed alphabet (A, C, G, T, U) and whitespace.
    2. Strips all whitespace characters.
    3. Converts to uppercase.
    """
    if not re.match(RNA_DNA_REGEX, v):
        raise ValueError("Invalid characters in biometric sequence")

    return "".join(v.split()).upper()