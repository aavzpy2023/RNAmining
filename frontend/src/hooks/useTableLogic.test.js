import { renderHook, act } from '@testing-library/react';
import { useTableLogic } from './useTableLogic';

describe('useTableLogic headless hook', () => {
    const mockData = [
        { id: 'seq1', classification: 'coding', probability: 0.99 },
        { id: 'seq2', classification: 'non-coding', probability: 0.12 }
    ];

    it('should correctly filter based on classification key', () => {
        const { result } = renderHook(() => useTableLogic(mockData));
        
        act(() => {
            result.current.setSearch('coding');
        });
        
        // Both 'coding' and 'non-coding' contain the string 'coding'
        expect(result.current.paginatedData.length).toBe(2);
        
        act(() => {
            result.current.setSearch('non-coding');
        });
        
        // Only 'non-coding' matches precisely
        expect(result.current.paginatedData.length).toBe(1);
        expect(result.current.paginatedData[0].id).toBe('seq2');
    });

    it('should maintain stable pagination bounds', () => {
        const { result } = renderHook(() => useTableLogic(mockData));
        
        // Lower bound check (cannot go below page 1)
        act(() => {
            result.current.setPage(0);
        });
        expect(result.current.currentPage).toBe(1);
        
        // Upper bound check (cannot go above totalPages, which is 1 for 2 items)
        act(() => {
            result.current.setPage(5);
        });
        expect(result.current.currentPage).toBe(1);
    });
});