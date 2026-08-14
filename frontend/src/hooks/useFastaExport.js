import { useCallback } from 'react';

/**
 * Headless hook to serialize unified UI state back into FASTA files.
 * Provides memory-safe Blob operations strictly separated from view logic.
 * 
 * @returns {object} { exportAll, exportCoding, exportNonCoding }
 */
export const useFastaExport = () => {
    /**
     * Serializes an array of sequences into a raw FASTA Blob.
     * @param {Array} data - Array of unified sequence objects
     * @returns {Blob} Generated FASTA text blob
     */
    const generateBlob = (data) => {
        const fastaText = data.map(d => `>${d.id}\n${d.sequence}`).join('\n') + '\n';
        return new Blob([fastaText], { type: 'text/plain' });
    };

    /**
     * Executes the browser download and cleans up URL memory.
     */
    const triggerDownload = (blob, filename) => {
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = filename;
        
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        
        // Ensure memory cleanup of the object URL
        setTimeout(() => URL.revokeObjectURL(url), 150);
    };

    const exportAll = useCallback((data) => {
        if (!data || data.length === 0) return;
        triggerDownload(generateBlob(data), 'results_all.fasta');
    }, []);

    const isCoding = (d) => {
        const lowerId = (d.id || '').toLowerCase();
        const cls = (d.classification || d.prediction || '').toLowerCase();
        if (lowerId.includes('cds')) return true;
        if (lowerId.includes('ncrna')) return false;
        return cls === 'coding';
    };

    const isNonCoding = (d) => {
        const lowerId = (d.id || '').toLowerCase();
        const cls = (d.classification || d.prediction || '').toLowerCase();
        if (lowerId.includes('ncrna')) return true;
        if (lowerId.includes('cds')) return false;
        return cls === 'non-coding';
    };

    const exportCoding = useCallback((data) => {
        if (!data || data.length === 0) return;
        const filtered = data.filter(isCoding);
        triggerDownload(generateBlob(filtered), 'results_coding.fasta');
    }, []);

    const exportNonCoding = useCallback((data) => {
        if (!data || data.length === 0) return;
        const filtered = data.filter(isNonCoding);
        triggerDownload(generateBlob(filtered), 'results_non-coding.fasta');
    }, []);

    return { exportAll, exportCoding, exportNonCoding };
};