import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResultsTable } from '../ResultsTable';

describe('ResultsTable (Dumb View)', () => {
    const mockData = Array.from({ length: 40 }, (_, i) => ({
        id: `seq_${i}`,
        prediction: 'coding',
        probability: 0.99
    }));

    const mockSearchHandlers = { search: '', setSearch: jest.fn() };
    const mockPaginationHandlers = { currentPage: 1, totalPages: 2, setPage: jest.fn() };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders English headers and exactly 40 rows', () => {
        render(
            <ResultsTable 
                data={mockData} 
                searchHandlers={mockSearchHandlers} 
                paginationHandlers={mockPaginationHandlers} 
            />
        );

        // Assert strictly English column headers
        expect(screen.getByText('Sequence ID')).toBeInTheDocument();
        expect(screen.getByText('Coding Potential')).toBeInTheDocument();
        expect(screen.getByText('Probability')).toBeInTheDocument();

        // 1 Header row + 40 Data rows = 41 total tr elements
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(41);
    });

    it('triggers search handler safely', () => {
        render(
            <ResultsTable 
                data={mockData} 
                searchHandlers={mockSearchHandlers} 
                paginationHandlers={mockPaginationHandlers} 
            />
        );

        const searchInput = screen.getByPlaceholderText('Search sequences...');
        fireEvent.change(searchInput, { target: { value: 'test' } });
        expect(mockSearchHandlers.setSearch).toHaveBeenCalledWith('test');
    });

    it('triggers pagination safely', () => {
        render(
            <ResultsTable 
                data={mockData} 
                searchHandlers={mockSearchHandlers} 
                paginationHandlers={mockPaginationHandlers} 
            />
        );

        const nextButton = screen.getByText('Next');
        fireEvent.click(nextButton);
        expect(mockPaginationHandlers.setPage).toHaveBeenCalledWith(2);
    });
});