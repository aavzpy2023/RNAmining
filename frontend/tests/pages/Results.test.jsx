/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Results from '../../src/pages/Results';

describe('Results Dashboard', () => {
  it('renders HTML table headers accurately', () => {
    const mockState = {
      results: [
        { header: 'seq1', sequence: 'AUGC', prediction: 1, probability: 0.99, classification: 'coding' }
      ]
    };

    render(
      <MemoryRouter initialEntries={[{ pathname: '/results', state: mockState }]}>
        <Results />
      </MemoryRouter>
    );

    expect(screen.getByText('Header')).toBeDefined();
    expect(screen.getByText('Sequence')).toBeDefined();
    expect(screen.getByText('Prediction')).toBeDefined();
    expect(screen.getByText('Classification')).toBeDefined();
    expect(screen.getByText('seq1')).toBeDefined();
    expect(screen.getByText('coding')).toBeDefined();
  });
});