import { useState, useCallback } from 'react';

const VALID_EXTENSIONS = ['.fasta', '.fa', '.fna', '.ffn', '.faa', '.frn'];

export function useFastaUpload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateAndSetFile = useCallback((selectedFile) => {
    if (!selectedFile) {
      setFile(null);
      setError(null);
      return;
    }

    const fileName = selectedFile.name.toLowerCase();
    const isValid = VALID_EXTENSIONS.some((ext) => fileName.endsWith(ext));

    if (!isValid) {
      setFile(null);
      setError('Formato no válido. Debe ser un archivo .fasta o .fa');
      return;
    }

    setFile(selectedFile);
    setError(null);
  }, []);

  const handleFileSelect = useCallback((selectedFile) => {
    validateAndSetFile(selectedFile);
  }, [validateAndSetFile]);

  const clearFile = useCallback(() => {
    setFile(null);
    setError(null);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  }, [validateAndSetFile]);

  return {
    file,
    error,
    isDragging,
    handleFileSelect,
    clearFile,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}

export default useFastaUpload;