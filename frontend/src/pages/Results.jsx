import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useFastaExport } from '../hooks/useFastaExport';
import { useTableLogic } from '../hooks/useTableLogic';
import { ResultsTable } from '../components/ResultsTable';

export default function Results() {
  const location = useLocation();
  const data = location.state?.data;
  const tableHandlers = useTableLogic(data || []);
  const { exportAll, exportCoding, exportNonCoding } = useFastaExport();

  if (!data || data.length === 0) {
    return (
      <div style={{ color: '#f8fafc', padding: '40px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '16px' }}>No data available. Please run an analysis.</h2>
        <Link to="/" style={btnStyle}>Return to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ color: '#f8fafc', padding: '20px' }}>
      <h2 style={{ marginBottom: '16px' }}>📊 Analysis Results</h2>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button onClick={() => exportAll(data)} style={btnStyle}>
          Export All (FASTA)
        </button>
        <button onClick={() => exportCoding(data)} style={btnStyle}>
          Export Coding (FASTA)
        </button>
        <button onClick={() => exportNonCoding(data)} style={btnStyle}>
          Export Non-Coding (FASTA)
        </button>
      </div>
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
