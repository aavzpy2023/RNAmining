import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { RunSection } from '../RunSection';

// Mock target route to assert that router state is fully primitive and correct
const ResultsStub = () => {
    const location = useLocation();
    return <div data-testid="results-state">{JSON.stringify(location.state)}</div>;
};

describe('RunSection Routing & State Zipping', () => {
    it('safely zips raw sequence data with backend predictions and navigates', async () => {
        const mockFile = new File(
            ['>seq1\nATGC\n>seq2\nCGTA'], 
            'test.fasta', 
            { type: 'text/plain' }
        );
        const mockResult = {
            predictions: [
                { classification: 'coding', probability: 0.99 },
                { classification: 'non-coding', probability: 0.88 }
            ]
        };

        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <RunSection 
                                isRunning={false} 
                                disabled={false} 
                                onClick={jest.fn()} 
                                result={mockResult} 
                                file={mockFile} 
                            />
                        } 
                    />
                    <Route path="/results" element={<ResultsStub />} />
                </Routes>
            </MemoryRouter>
        );

        // Wait for asynchronous file.text() resolution and Router navigation
        await waitFor(() => {
            expect(screen.getByTestId('results-state')).toBeInTheDocument();
        });

        const stateText = screen.getByTestId('results-state').textContent;
        const stateData = JSON.parse(stateText);

        expect(stateData.data).toHaveLength(2);
        
        // Assert primitive boundary enforcement & mapping
        expect(stateData.data[0]).toEqual({
            id: 'seq1',
            sequence: 'ATGC',
            prediction: 'coding',
            probability: 0.99
        });
        
        expect(stateData.data[1]).toEqual({
            id: 'seq2',
            sequence: 'CGTA',
            prediction: 'non-coding',
            probability: 0.88
        });
    });
});