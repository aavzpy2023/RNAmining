import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RunButton from './RunButton';
import RunSection from './RunSection';

const { mockNavigate } = vi.hoisted(() => ({ mockNavigate: vi.fn() }));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Routing Triggers & Component De-duplication', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('RunButton strictly triggers onClick and DOES NOT call navigate', () => {
    const onClickMock = vi.fn();
    render(
      <MemoryRouter>
        <RunButton isRunning={false} disabled={false} onClick={onClickMock} />
      </MemoryRouter>
    );
    const button = screen.getByTestId('run-button');
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('RunSection triggers navigate correctly when result and file are present', async () => {
    const mockFile = { text: async () => ">seq1\nATGC" };
    const mockResult = { predictions: [] };
    
    render(
      <MemoryRouter>
        <RunSection 
          isRunning={false} 
          disabled={false} 
          onClick={vi.fn()} 
          result={mockResult} 
          file={mockFile} 
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/results', expect.anything());
    });
  });
});