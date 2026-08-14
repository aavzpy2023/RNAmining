import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const formatToFasta = (record) => {
  return `>${record.header}\n${record.sequence}\n`;
};

export const filterRecords = (records, filterType) => {
  if (filterType === 'all') return records;
  return records.filter(r => r.classification === filterType);
};

export const useZipExport = () => {
  const exportSequences = async (records, filterType = 'all', filename = 'results.zip') => {
    if (!records || records.length === 0) return;

    const filtered = filterRecords(records, filterType);
    if (filtered.length === 0) return;

    const zip = new JSZip();
    const fastaContent = filtered.map(formatToFasta).join('');
    
    zip.file(`sequences_${filterType}.fasta`, fastaContent);
    const blob = await zip.generateAsync({ type: 'blob' });
    
    saveAs(blob, filename);
  };

  return { exportSequences };
};