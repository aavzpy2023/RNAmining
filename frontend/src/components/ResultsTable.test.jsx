import React from 'react';
import { render, screen } from '@testing-library/react';
import { ResultsTable } from './ResultsTable';

describe('ResultsTable Component', () => {
    const mockSearchHandlers = { search: '', setSearch: jest.fn() };
    const mockPaginationHandlers = { currentPage: 1, totalPages: 1, setPage: jest.fn() };

    it('enforces table-layout: fixed for CSS Grid determinism', () => {
        render(
            <ResultsTable 
                data={[]} 
                searchHandlers={mockSearchHandlers} 
                paginationHandlers={mockPaginationHandlers} 
            />
        );
        
        const table = screen.getByRole('table');
        expect(table).toHaveStyle('table-layout: fixed');
    });

    it('renders classification data and falls back to unknown', () => {
        const testData = [
            { id: 'seq1', classification: 'coding', probability: 0.99 },
            { id: 'seq2' } // Missing classification and probability
        ];

        render(
            <ResultsTable 
                data={testData} 
                searchHandlers={mockSearchHandlers} 
                paginationHandlers={mockPaginationHandlers} 
            />
        );
        
        expect(screen.getByText('coding')).toBeInTheDocument();
        expect(screen.getByText('unknown')).toBeInTheDocument();
        
        // Probability fallback check for seq2 (0.0000)
        const zeroProbs = screen.getAllByText('0.0000');
        expect(zeroProbs.length).toBeGreaterThan(0);
    });
});