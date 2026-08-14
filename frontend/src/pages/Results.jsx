import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useFastaExport } from '../hooks/useFastaExport';
import { useTableLogic } from '../hooks/useTableLogic';
import { ResultsTable } from '../components/ResultsTable';

export default function Results() {
  const location = useLocation();
  const data = location.state?.data || [];
  const validData = data.filter(item => Number(item.probability) > 0);
  const hiddenCount = data.length - validData.length;
  const tableHandlers = useTableLogic(validData);
  const { exportAll, exportCoding, exportNonCoding } = useFastaExport();

  if (!data || data.length === 0) {
    return (
      <div style={{ color: '#f8fafc', padding: '40px', textAlign: 'center', minHeight: '100vh', width: '100%' }}>
        <h2 style={{ marginBottom: '16px' }}>No data available. Please run an analysis.</h2>
        <Link to="/" style={btnStyle}>Return to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ color: '#f8fafc', padding: '20px', minHeight: '100vh', width: '100%', alignSelf: 'flex-start' }}>
      <h2 style={{ marginBottom: '16px' }}>📊 Analysis Results</h2>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button onClick={() => exportAll(validData)} style={btnStyle}>
          Export All (FASTA)
        </button>
        <button onClick={() => exportCoding(validData)} style={btnStyle}>
          Export Coding (FASTA)
        </button>
        <button onClick={() => exportNonCoding(validData)} style={btnStyle}>
          Export Non-Coding (FASTA)
        </button>
      </div>
      {hiddenCount > 0 && (
        <div style={{ backgroundColor: '#1e293b', borderLeft: '4px solid #f59e0b', padding: '12px', borderRadius: '4px', marginBottom: '16px', color: '#cbd5e1', fontSize: '14px' }}>
          <strong>Note:</strong> {hiddenCount} sequence{hiddenCount !== 1 ? 's' : ''} did not resemble any organism (probability 0) and {hiddenCount !== 1 ? 'were' : 'was'} hidden.
        </div>
      )}
      <ResultsTable 
        data={tableHandlers.paginatedData}
        searchHandlers={{ 
            search: tableHandlers.search, 
            setSearch: tableHandlers.setSearch 
        }}
        paginationHandlers={{ 
            currentPage: tableHandlers.currentPage, 
            totalPages: tableHandlers.totalPages, 
            setPage: tableHandlers.setPage 
        }}
      />
    </div>
  );
}

const btnStyle = {
  padding: '10px 16px', backgroundColor: '#0284c7', color: 'white',
  border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
};
