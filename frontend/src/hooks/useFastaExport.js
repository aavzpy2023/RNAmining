import { useCallback } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

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
    const formatHeader = (headerId) => {
        if (!headerId) return '';
        // Locate 'gene:<symbol>' and split immediately after its value
        const geneRegex = /(gene:\S+)\s+(.+)/;
        if (geneRegex.test(headerId)) {
            return headerId.replace(geneRegex, '$1\n$2');
        }
        return headerId;
    };

    const wrapSequence = (seq, lineLength = 60) => {
        if (!seq) return '';
        const cleanSeq = seq.replace(/\s+/g, '');
        const regex = new RegExp(`.{1,${lineLength}}`, 'g');
        const chunks = cleanSeq.match(regex);
        return chunks ? chunks.join('\n') : cleanSeq;
    };

    const generateFastaText = (data) => {
        return data
            .map(d => `>${formatHeader(d.id)}\n${wrapSequence(d.sequence, 60)}`)
            .join('\n') + '\n';
    };

    const triggerZipDownload = async (fastaContent, fastaFilename, zipFilename) => {
        const zip = new JSZip();
        zip.file(fastaFilename, fastaContent);
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        saveAs(zipBlob, zipFilename);
    };

    const exportAll = useCallback(async (data) => {
        if (!data || data.length === 0) return;
        const text = generateFastaText(data);
        await triggerZipDownload(text, 'results_all.fasta', 'results_all.zip');
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

    const exportCoding = useCallback(async (data) => {
        if (!data || data.length === 0) return;
        const filtered = data.filter(isCoding);
        const text = generateFastaText(filtered);
        await triggerZipDownload(text, 'results_coding.fasta', 'results_coding.zip');
    }, []);

    const exportNonCoding = useCallback(async (data) => {
        if (!data || data.length === 0) return;
        const filtered = data.filter(isNonCoding);
        const text = generateFastaText(filtered);
        await triggerZipDownload(
            text,
            'results_non-coding.fasta',
            'results_non-coding.zip'
        );
    }, []);

    return { exportAll, exportCoding, exportNonCoding };
};