import React from 'react';
import { useLocation } from 'react-router-dom';
import { useZipExport } from '../hooks/useZipExport';

export default function Results() {
  const location = useLocation();
  const { exportSequences } = useZipExport();
  const records = location.state?.results || [];

  return (
    <div style={{ color: '#f8fafc', padding: '20px' }}>
      <h2 style={{ marginBottom: '16px' }}>📊 Analysis Results</h2>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button onClick={() => exportSequences(records, 'all')} style={btnStyle}>
          Export All (ZIP)
        </button>
        <button onClick={() => exportSequences(records, 'coding')} style={btnStyle}>
          Export Coding
        </button>
        <button onClick={() => exportSequences(records, 'non-coding')} style={btnStyle}>
          Export Non-Coding
        </button>
      </div>
      <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>Header</th>
            <th style={thStyle}>Sequence</th>
            <th style={thStyle}>Prediction</th>
            <th style={thStyle}>Probability</th>
            <th style={thStyle}>Classification</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i}>
              <td style={tdStyle}>{r.header}</td>
              <td style={tdStyle}>{r.sequence?.substring(0, 20)}...</td>
              <td style={tdStyle}>{r.prediction}</td>
              <td style={tdStyle}>{r.probability}</td>
              <td style={tdStyle}>{r.classification}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const btnStyle = {
  padding: '10px 16px', backgroundColor: '#0284c7', color: 'white',
  border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
};
const thStyle = { borderBottom: '2px solid #334155', padding: '12px 8px' };
const tdStyle = { borderBottom: '1px solid #1e293b', padding: '12px 8px' };