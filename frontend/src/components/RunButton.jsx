import React from 'react';
import { useNavigate } from 'react-router-dom';

export function RunButton({ isRunning, disabled, onClick, data }) {
  const navigate = useNavigate();
  const styles = {
    button: {
      width: '100%',
      padding: '14px 24px',
      borderRadius: '8px',
      backgroundColor: disabled || isRunning ? '#475569' : '#0284c7',
      color: '#ffffff',
      border: 'none',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: disabled || isRunning ? 'not-allowed' : 'pointer',
      transition: 'background-color 0.2s ease',
      marginTop: '16px',
    },
  };

  return (
    <button
      style={styles.button}
      onClick={async (e) => {
        if (onClick) await onClick(e);
        if (data?.results) navigate('/results', { state: { results: data.results } });
      }}
      disabled={disabled || isRunning}
      data-testid="run-button"
    >
      {isRunning ? '⏳ Ejecutando Inferencia...' : '🚀 Ejecutar Análisis ML'}
    </button>
  );
}

export default RunButton;