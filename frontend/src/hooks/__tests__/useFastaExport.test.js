import { renderHook, act } from '@testing-library/react';
import { useFastaExport } from '../useFastaExport';

describe('useFastaExport (Headless FASTA Blob Exporter)', () => {
    const originalURL = global.URL;
    const originalBlob = global.Blob;
    
    let mockCreateObjectURL;
    let mockRevokeObjectURL;
    let blobContents = [];

    beforeEach(() => {
        blobContents = [];
        mockCreateObjectURL = jest.fn(() => 'blob:test-url');
        mockRevokeObjectURL = jest.fn();
        
        global.URL = {
            ...originalURL,
            createObjectURL: mockCreateObjectURL,
            revokeObjectURL: mockRevokeObjectURL
        };

        global.Blob = class MockBlob {
            constructor(content) {
                // Intercept the generated FASTA text
                blobContents.push(content[0]); 
            }
        };

        // Mock HTMLAnchorElement click to prevent actual navigation in JSDOM
        jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    });

    afterEach(() => {
        global.URL = originalURL;
        global.Blob = originalBlob;
        jest.restoreAllMocks();
    });

    it('strictly filters coding items and asserts FASTA newline format', () => {
        const mockData = [
            { id: 'seq1', sequence: 'ATGC', prediction: 'coding' },
            { id: 'seq2', sequence: 'CGTA', prediction: 'non-coding' }
        ];

        const { result } = renderHook(() => useFastaExport());

        act(() => {
            result.current.exportCoding(mockData);
        });

        // Ensure non-coding seq2 was stripped
        expect(blobContents).toHaveLength(1);
        expect(blobContents[0]).toBe('>seq1\nATGC\n');
        expect(mockCreateObjectURL).toHaveBeenCalled();
    });

    it('exports all items regardless of prediction', () => {
        const mockData = [
            { id: 'seq1', sequence: 'A', prediction: 'coding' },
            { id: 'seq2', sequence: 'C', prediction: 'non-coding' }
        ];

        const { result } = renderHook(() => useFastaExport());

        act(() => {
            result.current.exportAll(mockData);
        });

        expect(blobContents[0]).toBe('>seq1\nA\n>seq2\nC\n');
    });
});