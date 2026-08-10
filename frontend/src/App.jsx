import React, { useState, useEffect } from 'react';
import { useFastaUpload } from './hooks/useFastaUpload';
import { useOrganismSelect } from './hooks/useOrganismSelect';
import { FastaUploadCard } from './components/FastaUploadCard';
import { OrganismCard } from './components/OrganismCard';

// ==========================================
// MOCK HOOKS (For compilation and testing)
// ==========================================
const mockUseFastaUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile && !selectedFile.name.endsWith('.fasta')) {
      setError('Invalid file type. Only .fasta accepted.');
      setFile(null);
    } else {
      setFile(selectedFile);
      setError(null);
    }
  };

  const clearFile = () => { setFile(null); setError(null); };
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const selectedFile = e.dataTransfer.files ? e.dataTransfer.files[0] : null;
    if (selectedFile && !selectedFile.name.endsWith('.fasta')) {
      setError('Invalid file type. Only .fasta accepted.');
      setFile(null);
    } else {
      setFile(selectedFile);
      setError(null);
    }
  };

  return { file, error, isDragging, handleFileSelect, clearFile, handleDragOver, handleDragLeave, handleDrop };
};

const mockUseOrganismSelect = () => {
  const organismOptions = [
    { value: 'homo_sapiens', label: 'Homo sapiens' },
    { value: 'mus_musculus', label: 'Mus musculus' },
    { value: 'drosophila_melanogaster', label: 'Drosophila melanogaster' },
    { value: 'arabidopsis_thaliana', label: 'Arabidopsis thaliana' },
  ];
  const [selectedOrganism, setSelectedOrganism] = useState(organismOptions[0].value);
  return { selectedOrganism, setSelectedOrganism, organismOptions };
};

const useAnalysisRunner = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const executeAnalysis = (file, organism) => {
    if (!file) return;
    setIsRunning(true);
    setResult(null);
    setError(null);
    console.log(`Running analysis for ${file.name} on ${organism}...`);
    setTimeout(() => {
      setIsRunning(false);
      setResult({ status: 'success', jobId: 'rna_12345', organism, nodes: 150, links: 320 });
    }, 2000);
  };

  return { isRunning, result, error, executeAnalysis };
};

// ==========================================
// UNIFIED STYLES (Dark Theme, Compact)
// ==========================================
const styles = {
  // Using 100dvh (dynamic viewport height) handles mobile browser bars better
  wrapper: { display: 'flex', flexDirection: 'column', minHeight: '100dvh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'system-ui, sans-serif' },
  container: { padding: '24px 20px', maxWidth: '800px', margin: '0 auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  navbar: { backgroundColor: '#1e293b', borderBottom: '1px solid #334155', padding: '12px 24px' },
  navContent: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' },
  navLinks: { display: 'flex', gap: '24px', alignItems: 'center' },
  navLink: { color: '#f1f5f9', textDecoration: 'none', fontSize: '15px', fontWeight: '500', opacity: 0.8, cursor: 'pointer', background: 'none', border: 'none', padding: 0 },
  navLinkActive: { color: '#38bdf8', textDecoration: 'none', fontSize: '15px', fontWeight: '600', cursor: 'pointer', background: 'none', border: 'none', padding: 0 },
  footer: { backgroundColor: '#1e293b', borderTop: '1px solid #334155', padding: '16px', marginTop: 'auto', textAlign: 'center' },
  aboutContent: { lineHeight: '1.6', color: '#94a3b8' },
  aboutH2: { color: '#f8fafc', fontSize: '24px', marginTop: '32px', marginBottom: '16px', borderBottom: '1px solid #334155', paddingBottom: '8px' },
  aboutList: { paddingLeft: '20px', margin: '16px 0' },
  aboutListItem: { marginBottom: '12px' },
  hero: { textAlign: 'center', marginBottom: '24px' },
  heroH1: { fontSize: '32px', fontWeight: '700', color: '#f8fafc', margin: '0 0 8px 0' },
  heroP: { fontSize: '16px', color: '#94a3b8', margin: 0 },
  card: { border: '1px solid #334155', borderRadius: '16px', padding: '20px', backgroundColor: '#1e293b', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '10px', marginBottom: '16px' },
  cardTitle: { fontSize: '20px', fontWeight: '600', color: '#f8fafc', margin: 0 },
  infoLink: { color: '#38bdf8', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' },
  dropZone: { position: 'relative', border: '2px dashed #475569', borderRadius: '12px', padding: '16px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', backgroundColor: '#182235' },
  dropZoneDragging: { borderColor: '#38bdf8', backgroundColor: '#1e293b' },
  dropZoneIcon: { fontSize: '32px', color: '#38bdf8', opacity: 0.7 },
  dropZoneTextMain: { fontSize: '15px', fontWeight: '500', color: '#f1f5f9', margin: 0 },
  dropZoneTextSub: { fontSize: '13px', color: '#94a3b8', margin: 0 },
  fileStatus: { display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', fontSize: '14px', color: '#94a3b8', backgroundColor: '#0f172a', padding: '8px 12px', borderRadius: '8px', border: '1px solid #334155' },
  details: { backgroundColor: '#182235', borderRadius: '8px', border: '1px solid #334155', overflow: 'hidden', marginTop: '16px' },
  detailsSummary: { padding: '10px 16px', cursor: 'pointer', color: '#f1f5f9', fontSize: '14px', fontWeight: '500', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  detailsContent: { padding: '12px 16px', borderTop: '1px solid #334155', fontFamily: 'monospace', fontSize: '12px', color: '#94a3b8', overflowX: 'auto', whiteSpace: 'pre', backgroundColor: '#0f172a' },
  fastaHeader: { color: '#38bdf8' },
  selectWrapper: { position: 'relative', marginTop: '8px' },
  selectIcon: { position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '20px' },
  select: { width: '100%', padding: '10px 12px 10px 40px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc', fontSize: '15px', appearance: 'none', cursor: 'pointer' },
  runButton: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '14px', backgroundColor: '#0284c7', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(2, 132, 199, 0.3)' },
  resultsCard: { border: '1px solid #0284c7', borderRadius: '12px', padding: '20px', backgroundColor: '#0f172a', marginTop: '20px' },
  errorBox: { color: '#f87171', backgroundColor: '#450a0a', padding: '12px', borderRadius: '8px', marginTop: '12px', fontSize: '14px' },
};

// ==========================================
// UI COMPONENTS
// ==========================================

const Navbar = ({ currentView, setView }) => (
  <header style={styles.navbar}>
  <div style={styles.navContent}>
  <button onClick={() => setView('run')} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer' }}>
  <span className="material-symbols-outlined" style={{ color: '#38bdf8', fontWeight: 'bold' }}>biotech</span>
  <span style={{ fontSize: '22px', fontWeight: '700', color: '#38bdf8', letterSpacing: '-0.02em' }}>rnamining</span>
  </button>
  <nav style={styles.navLinks}>
  <button onClick={() => setView('run')} style={currentView === 'run' ? styles.navLinkActive : styles.navLink}>Run</button>
  <button onClick={() => setView('about')} style={currentView === 'about' ? styles.navLinkActive : styles.navLink}>About</button>
  <a href="#" style={styles.navLink}>Tutorial</a>
  <a href="#" style={styles.navLink}>Download</a>
  <a href="#" style={styles.navLink}>Contact</a>
  </nav>
  </div>
  </header>
);

const MockFastaUploadCard = ({ file, error, isDragging, onFileSelect, clearFile, onDragOver, onDragLeave, onDrop }) => (
  <section style={styles.card}>
  <div style={styles.cardHeader}>
  <h2 style={styles.cardTitle}>Dataset</h2>
  <a href="#" style={styles.infoLink}>
  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>info</span>
  .fasta - examples
  </a>
  </div>

  <div
  style={{ ...styles.dropZone, ...(isDragging ? styles.dropZoneDragging : {}) }}
  onDragOver={onDragOver}
  onDragLeave={onDragLeave}
  onDrop={onDrop}
  onClick={() => document.getElementById('fileInput').click()}
  >
  <span className="material-symbols-outlined" style={styles.dropZoneIcon}>cloud_upload</span>
  <p style={styles.dropZoneTextMain}>Drag and drop your file here</p>
  <p style={styles.dropZoneTextSub}>or click to browse</p>
  <input id="fileInput" type="file" accept=".fasta" onChange={onFileSelect} style={{ display: 'none' }} />
  </div>

  {file && (
    <div style={styles.fileStatus}>
    <span className="material-symbols-outlined" style={{ color: '#4ade80', fontSize: '18px' }}>check_circle</span>
    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
    <button onClick={clearFile} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', padding: 0, fontSize: '18px' }}>
    <span className="material-symbols-outlined">close</span>
    </button>
    </div>
  )}

  {error && <div style={styles.errorBox}>❌ {error}</div>}

  <details style={styles.details}>
  <summary style={styles.detailsSummary}>
  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#94a3b8' }}>visibility</span>
  View Sample Sequences
  </span>
  <span className="material-symbols-outlined">expand_more</span>
  </summary>
  <div style={styles.detailsContent}>
  <span style={styles.fastaHeader}>&gt;RNA_Sequence_1</span>
  GTCTCCCCTAGAGTTCCCTTGACCACTTCACTGGGGACCTTCTCTAATTATAATGACTTC
  CTACTGAAGTGTTTGGGGGAACTCCTGGTGCCAT
  <span style={styles.fastaHeader}>&gt;RNA_Sequence_2</span>
  ATCGCTTCTCGGCCTTTTGGCTAAGATCAAGTGTAGGAACAAATATATTTGAAGTTTTTA
  TAACTTTGTTTTTTGAAATTAATGTTTGGTTGTCAGAGATCACAATTTCTTTTCAGTAAT
  TTCTAGGAATATTCTCA
  </div>
  </details>
  </section>
);

const MockOrganismCard = ({ selectedOrganism, organismOptions, onOrganismChange }) => (
  <section style={styles.card}>
  <div style={{ ...styles.cardHeader, border: 'none', marginBottom: '6px', paddingBottom: 0 }}>
  <h2 style={styles.cardTitle}>Organisms</h2>
  <span className="material-symbols-outlined" style={{ color: '#94a3b8' }}>science</span>
  </div>
  <label style={{ fontSize: '14px', color: '#94a3b8' }}>Select Target Organism</label>
  <div style={styles.selectWrapper}>
  <span className="material-symbols-outlined" style={styles.selectIcon}>search</span>
  <select
  style={styles.select}
  value={selectedOrganism}
  onChange={(e) => onOrganismChange(e.target.value)}
  >
  {organismOptions.map(opt => (
    <option key={opt.value} value={opt.value}>{opt.label}</option>
  ))}
  </select>
  </div>
  </section>
);

const RunSection = ({ isRunning, disabled, onClick }) => (
  <section style={{ textAlign: 'center', marginTop: '16px' }}>
  <button
  style={{
    ...styles.runButton,
    ...(disabled || isRunning ? { opacity: 0.5, cursor: 'not-allowed', boxShadow: 'none' } : {})
  }}
  onClick={onClick}
  disabled={disabled || isRunning}
  >
  {isRunning ? (
    <>
    <span className="material-symbols-outlined animate-spin">sync</span>
    Running...
    </>
  ) : (
    <>
    <span className="material-symbols-outlined">play_circle</span>
    Run RNAmining
    </>
  )}
  </button>
  <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '12px' }}>
  Example of results are made available <a href="#" style={{ color: '#38bdf8', textDecoration: 'underline' }}>here</a>.
  </p>
  </section>
);

const Footer = () => (
  <footer style={styles.footer}>
  <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <p style={{ fontSize: '12px', color: '#64748b', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>
  Copyright © 2024 Laboratory of Integrative Bioinformatics - University of Chile
  </p>
  </div>
  </footer>
);

// ==========================================
// MAIN APP COMPONENT
// ==========================================

function App() {
  const [currentView, setView] = useState('run');
  const fastaUpload = useFastaUpload();
  const organismSelect = useOrganismSelect();
  const analysisRunner = useAnalysisRunner();

  const handleRun = () => {
    analysisRunner.executeAnalysis(
      fastaUpload.file,
      organismSelect.selectedOrganism
    );
  };

  return (
    <div style={styles.wrapper} data-testid="app-shell">
    {/*
      CRITICAL FIX: Global CSS reset injected to remove default body margins.
      This prevents the phantom vertical scrollbar regardless of zoom level.
      */}
      <style>{`
        body {
          margin: 0;
          padding: 0;
          background-color: #0f172a;
        }
        * {
          box-sizing: border-box;
        }
        `}</style>

        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

        <Navbar currentView={currentView} setView={setView} />

        <main style={styles.container}>
        {currentView === 'run' ? (
        <div style={{ width: '100%' }}>
        <section style={styles.hero}>
        <h1 style={styles.heroH1}>Run Analysis</h1>
        <p style={styles.heroP}>Upload your .fasta files to begin.</p>
        </section>

        <FastaUploadCard
          file={fastaUpload.file}
          error={fastaUpload.error}
          isDragging={fastaUpload.isDragging}
          onFileSelect={fastaUpload.handleFileSelect}
          onClearFile={fastaUpload.clearFile}
          onDragOver={fastaUpload.handleDragOver}
          onDragLeave={fastaUpload.handleDragLeave}
          onDrop={fastaUpload.handleDrop}
        />

        <OrganismCard
          selectedOrganism={organismSelect.selectedOrganism}
          organismOptions={organismSelect.organismOptions}
          onOrganismChange={organismSelect.setSelectedOrganism}
          isLoading={organismSelect.isLoading}
        />

        <RunSection
        isRunning={analysisRunner.isRunning}
        disabled={!fastaUpload.file || Boolean(fastaUpload.error)}
        onClick={handleRun}
        />

        {analysisRunner.error && (
          <div style={styles.errorBox}>
          ❌ {analysisRunner.error}
          </div>
        )}

        {analysisRunner.result && (
          <div style={styles.resultsCard} data-testid="results-card">
          <h3 style={{ ...styles.cardTitle, fontSize: '16px', marginBottom: '8px' }}>📊 ML Inference Results:</h3>
          <pre style={{ overflowX: 'auto', fontSize: '12px', color: '#4ade80', backgroundColor: '#1e293b', padding: '12px', borderRadius: '8px', margin: 0 }}>
          {JSON.stringify(analysisRunner.result, null, 2)}
          </pre>
          </div>
        )}
        </div>
        ) : (
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        <section style={styles.hero}>
        <h1 style={styles.heroH1}>About RNA Mining</h1>
        <p style={styles.heroP}>Predicting Neural Coding Potential with High Precision</p>
        </section>

        <div style={styles.aboutContent}>
        <p>
        <strong>RNA Mining</strong> is a high-performance bioinformatics pipeline
        designed for <strong>nucleotide coding potential prediction</strong> using
        advanced Machine Learning architectures. The system enables researchers
        to process FASTA sequences to determine coding or non-coding
        characteristics with industry-leading accuracy.
        </p>

        <h2 style={styles.aboutH2}>Our Mission</h2>
        <p>
        To provide a robust, scalable tool that simplifies massive genomic analysis,
        enabling ML model inference over real-time biological data streams.
        </p>

        <h2 style={styles.aboutH2}>Technical Architecture</h2>
        <ul style={styles.aboutList}>
        <li style={styles.aboutListItem}>
        <strong>Vertical Slice Architecture:</strong> Designed with hexagonal boundaries
        to decouple business logic from technical infrastructure.
        </li>
        <li style={styles.aboutListItem}>
        <strong>Machine Learning Core:</strong> Optimized with <strong>XGBoost</strong>
        (via Scikit-Learn) and Joblib persistence for efficient model loading.
        </li>
        <li style={styles.aboutListItem}>
        <strong>Bioinformatic Processing:</strong> Powered by <strong>Biopython</strong>
        for FASTA/FASTQ stream parsing, ensuring industry-standard data handling.
        </li>
        <li style={styles.aboutListItem}>
        <strong>High-Speed Backend:</strong> Built with <strong>FastAPI</strong>
        (Python 3.11+), leveraging dependency injection and asynchronous processing.
        </li>
        <li style={styles.aboutListItem}>
        <strong>Modern Interface:</strong> Crafted with <strong>React 19 and Vite</strong>,
        featuring a dark theme design system and decoupled state management.
        </li>
        </ul>

        <h2 style={styles.aboutH2}>Key Features</h2>
        <ul style={styles.aboutList}>
        <li style={styles.aboutListItem}><strong>Multi-Organism Analysis:</strong> Dynamic parameter adjustment based on target species.</li>
        <li style={styles.aboutListItem}><strong>Large File Handling:</strong> Multipart upload system transforming raw sequences into structured DTOs.</li>
        <li style={styles.aboutListItem}><strong>High Availability Infrastructure:</strong> Full orchestration via <strong>Docker Compose</strong> with Nginx Reverse Proxy.</li>
        <li style={styles.aboutListItem}><strong>Military-Grade Quality:</strong> Comprehensive test suite (Pytest) validating dependency integrity and biometric parser accuracy.</li>
        </ul>

        <h2 style={styles.aboutH2}>Credits & Development</h2>
        <p>
        Developed at the <strong>Laboratory of Integrative Bioinformatics - University of Chile</strong>.
        </p>
        <ul style={styles.aboutList}>
        <li style={styles.aboutListItem}><strong>Lead Architect:</strong> Andrey Vinajera Zamora.</li>
        <li style={styles.aboutListItem}><strong>Technologies:</strong> FastAPI, Scikit-Learn, Biopython, React, Docker.</li>
        </ul>
        </div>
        </div>
        )}
        </main>

        <Footer />
        </div>
  );
}

export default App;
