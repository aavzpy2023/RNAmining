import { describe, it, expect } from 'vitest';
import { formatToFasta, filterRecords } from '../../src/hooks/useZipExport';

describe('useZipExport Logic (Pure State)', () => {
  it('formats record to FASTA string format', () => {
    const record = { header: 'seq1', sequence: 'AUGC' };
    const result = formatToFasta(record);
    expect(result).toBe('>seq1\nAUGC\n');
  });

  it('filters records by classification accurately', () => {
    const records = [
      { header: '1', sequence: 'A', classification: 'coding' },
      { header: '2', sequence: 'U', classification: 'non-coding' }
    ];
    
    expect(filterRecords(records, 'all')).toHaveLength(2);
    
    const codingOnly = filterRecords(records, 'coding');
    expect(codingOnly).toHaveLength(1);
    expect(codingOnly[0].header).toBe('1');
    
    expect(filterRecords(records, 'non-coding')).toHaveLength(1);
  });
});