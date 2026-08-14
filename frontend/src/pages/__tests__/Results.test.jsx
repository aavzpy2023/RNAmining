import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Results from '../Results';
import { useLocation } from 'react-router-dom';
import { useTableLogic } from '../../hooks/useTableLogic';
import { useFastaExport } from '../../hooks/useFastaExport';

// Mock External Libraries and Fractality Hooks
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn()
}));

jest.mock('../../hooks/useTableLogic', () => ({
    useTableLogic: jest.fn()
}));

jest.mock('../../hooks/useFastaExport', () => ({
    useFastaExport: jest.fn()
}));

// Isolate Dumb View Component
jest.mock('../../components/ResultsTable', () => ({
    ResultsTable: () => <div data-testid="mock-results-table">Mocked Table</div>
}));

describe('Results Page Container (Fractality Assembly)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders strict English fallback boundary when state is null', () => {
        useLocation.mockReturnValue({ state: null });
        useTableLogic.mockReturnValue({});
        useFastaExport.mockReturnValue({});

        render(<MemoryRouter><Results /></MemoryRouter>);
        
        expect(screen.getByText('No data available. Please run an analysis.')).toBeInTheDocument();
        expect(screen.getByText('Return to Home')).toBeInTheDocument();
        expect(screen.queryByTestId('mock-results-table')).not.toBeInTheDocument();
    });

    it('mounts hooks and wires exporter callbacks safely', () => {
        const mockData = [{ id: 'seq1', prediction: 'coding', probability: 0.99 }];
        
        useLocation.mockReturnValue({ state: { data: mockData } });
        useTableLogic.mockReturnValue({
            paginatedData: mockData,
            search: '',
            setSearch: jest.fn(),
            currentPage: 1,
            totalPages: 1,
            setPage: jest.fn()
        });

        const exportAllMock = jest.fn();
        useFastaExport.mockReturnValue({
            exportAll: exportAllMock,
            exportCoding: jest.fn(),
            exportNonCoding: jest.fn()
        });

        render(<MemoryRouter><Results /></MemoryRouter>);

        expect(screen.getByTestId('mock-results-table')).toBeInTheDocument();

        const exportAllBtn = screen.getByText('Export All (FASTA)');
        fireEvent.click(exportAllBtn);

        expect(exportAllMock).toHaveBeenCalledWith(mockData);
    });
});