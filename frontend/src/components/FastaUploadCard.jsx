import React, { useRef } from 'react';

export function FastaUploadCard({
  file,
  error,
  isDragging,
  onFileSelect,
  onClearFile,
  onDragOver,
  onDragLeave,
  onDrop,
}) {
  const inputRef = useRef(null);

  const styles = {
    card: {
      border: isDragging ? '2px dashed #38bdf8' : '2px dashed #475569',
      borderRadius: '12px',
      padding: '24px',
      backgroundColor: isDragging ? '#1e293b' : '#0f172a',
      textAlign: 'center',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      margin: '16px 0',
    },
    icon: {
      fontSize: '32px',
      marginBottom: '8px',
    },
    fileInfo: {
      color: '#38bdf8',
      fontWeight: '600',
      marginTop: '8px',
    },
    errorText: {
      color: '#f87171',
      fontSize: '14px',
      marginTop: '8px',
    },
    button: {
      backgroundColor: '#334155',
      color: '#f8fafc',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '6px',
      cursor: 'pointer',
      marginTop: '12px',
    },
    hiddenInput: {
      display: 'none',
    },
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      style={styles.card}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      data-testid="fasta-upload-card"
    >
      <input
        ref={inputRef}
        type="file"
        accept=".fasta,.fa,.fna,.ffn,.faa,.frn"
        style={styles.hiddenInput}
        onChange={handleInputChange}
        data-testid="fasta-file-input"
      />
      <div style={styles.icon}>🧬</div>
      <h3>Arrastra y suelta tu archivo FASTA aquí</h3>
      <p style={{ color: '#94a3b8', fontSize: '14px' }}>
        Soporta extensiones .fasta, .fa o haz clic para seleccionar
      </p>

      {file && (
        <div style={styles.fileInfo}>
          <span>📄 {file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
          <br />
          <button
            style={styles.button}
            onClick={(e) => {
              e.stopPropagation();
              onClearFile();
            }}
          >
            Quitar archivo
          </button>
        </div>
      )}

      {error && <p style={styles.errorText}>❌ {error}</p>}
    </div>
  );
}

export default FastaUploadCard;