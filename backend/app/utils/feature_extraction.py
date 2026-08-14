import itertools
from typing import List

BASES = ['A', 'C', 'G', 'U']
KMER_KEYS = ["".join(p) for p in itertools.product(BASES, repeat=3)]

def extract_3mers(sequence: str) -> List[float]:
    """
    Extracts and normalizes trinucleotide frequencies into a 64-element list.
    Standardizes sequence to uppercase RNA (T -> U).
    """
    seq = sequence.upper().replace('T', 'U')
    counts = {k: 0.0 for k in KMER_KEYS}
    total = 0
    
    for i in range(len(seq) - 2):
        kmer = seq[i:i+3]
        if kmer in counts:
            counts[kmer] += 1.0
            total += 1
            
    if total == 0:
        return [0.0] * 64
        
    return [counts[k] / total for k in KMER_KEYS]