import { useState, useCallback } from 'react';
import { runInferenceApi } from '../services/api';

export function useAnalysisRunner() {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const executeAnalysis = useCallback(async (file, organism) => {
    if (!file) {
      setError('Por favor selecciona un archivo FASTA válido.');
      return;
    }

    setIsRunning(true);
    setError(null);
    setResult(null);

    try {
      const data = await runInferenceApi(file, organism);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Error en la ejecución de la inferencia.');
    } finally {
      setIsRunning(false);
    }
  }, []);

  const resetAnalysis = useCallback(() => {
    setIsRunning(false);
    setResult(null);
    setError(null);
  }, []);

  return {
    isRunning,
    result,
    error,
    executeAnalysis,
    resetAnalysis,
  };
}

export default useAnalysisRunner;