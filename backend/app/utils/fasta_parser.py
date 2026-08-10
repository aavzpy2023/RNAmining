from Bio import SeqIO
from io import StringIO
from typing import List
from app.schemas.fasta import FastaRecordDTO

def parse_fasta_bytes(content: bytes) -> List[FastaRecordDTO]:
    """
    Parses FASTA byte stream into a list of FastaRecordDTOs.
    Strictly under 25 lines as per roadmap requirements.
    """
    text = content.decode("utf-8")
    records = []
    # Use Biopython SeqIO for robust stream parsing
    for record in SeqIO.parse(StringIO(text), "fasta"):
        records.append(FastaRecordDTO(
            header=str(record.id),
            sequence=str(record.seq),
            length=len(record.seq)
        ))
    return records