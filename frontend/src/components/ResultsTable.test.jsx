import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

    it('renders classification data, formats ID, and opens modal', () => {
        const testData = [
            { id: 'gene:ATMG00950 ncrna extra', probability: 0.99 },
            { id: 'seq2 cds' } // Will derive 'coding'
        ];

        render(
            <ResultsTable 
                data={testData} 
                searchHandlers={mockSearchHandlers} 
                paginationHandlers={mockPaginationHandlers} 
            />
        );
        
        // Derived classifications from IDs
        expect(screen.getByText('non-coding')).toBeInTheDocument();
        expect(screen.getByText('coding')).toBeInTheDocument();
        
        // ID Formatted: 'ATMG00950 ncrna'
        const formattedId = screen.getByText('ATMG00950 ncrna');
        expect(formattedId).toBeInTheDocument();
        
        // Modal click
        fireEvent.click(formattedId);
        expect(screen.getByText('Sequence Details')).toBeInTheDocument();
        expect(screen.getByText('gene:ATMG00950 ncrna extra')).toBeInTheDocument();
    });
});