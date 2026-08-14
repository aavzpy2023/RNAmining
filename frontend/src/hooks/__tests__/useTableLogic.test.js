import { renderHook, act } from '@testing-library/react';
import { useTableLogic } from '../useTableLogic';

describe('useTableLogic (Headless Fractality)', () => {
    const generateMockData = (count) => {
        return Array.from({ length: count }, (_, i) => ({
            id: `seq_${i}`,
            sequence: 'ATGC',
            prediction: i % 2 === 0 ? 'coding' : 'non-coding',
            probability: 0.9
        }));
    };

    it('strictly paginates to 40 items max', () => {
        const mockData = generateMockData(100);
        const { result } = renderHook(() => useTableLogic(mockData));

        // Page 1 should hold exactly 40 items
        expect(result.current.paginatedData).toHaveLength(40);
        expect(result.current.totalPages).toBe(3);
        
        act(() => {
            result.current.setPage(3);
        });

        // Page 3 holds the remaining 20 items (100 - 80)
        expect(result.current.paginatedData).toHaveLength(20);
    });

    it('filters items accurately by text search and recalibrates pages', () => {
        const mockData = [
            { id: 'seq_1', prediction: 'coding', probability: 0.9 },
            { id: 'alpha_2', prediction: 'non-coding', probability: 0.8 },
            { id: 'seq_3', prediction: 'coding', probability: 0.7 }
        ];

        const { result } = renderHook(() => useTableLogic(mockData));

        act(() => {
            result.current.setSearch('alpha');
        });

        // Ensure filtering applies safely
        expect(result.current.paginatedData).toHaveLength(1);
        expect(result.current.paginatedData[0].id).toBe('alpha_2');
        expect(result.current.totalPages).toBe(1);
    });
});